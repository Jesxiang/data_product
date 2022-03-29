"use strict";

let _ = require("lodash");
let ts = require("./util");

let normalizeName = function(id) {
  return id.replace(/\.|\-|\{|\}|\s/g, "_").replace(/_[0-9]/, '');
};

let getPathToMethodName = function(opts, m, path) {
  if (path === "/" || path === "") {
    return m;
  }

  // Clean url path for requests ending with '/'
  let cleanPath = path.replace(/\/$/, "");

  let segments = cleanPath.split("/").slice(1);
  segments = _.transform(segments, function(result, segment) {
    if (segment[0] === "{" && segment[segment.length - 1] === "}") {
      segment =
        "by" +
        segment[1].toUpperCase() +
        segment.substring(2, segment.length - 1);
    }

    result.push(segment);
  });
  let result = _.camelCase(segments.join("-"));
  return m.toLowerCase() + result[0].toUpperCase() + result.substring(1);
};

let resolvePathParams = function(path) {
  return path.replace(/{/g, "${");
};

let pascalCase = function(str) {
  return _.upperFirst(_.camelCase(str));
};

let resolveClassName = function(str) {
  return pascalCase(str).replace(/Controller$/, "API");
};

let resolveAPIFileName = function(str) {
  return str.replace(/controller$/, "api");
};

// 决定最终的类型
let resolveTsType = function(tsType) {
  let paramType = tsType.target || tsType.tsType;
  if (tsType.isRef) {
    paramType = "KtApi." + paramType;
  }

  if (paramType === "array") {
    if (tsType.elementType.target) {
      paramType = "Array<KtApi." + tsType.elementType.target + ">";
    } else {
      paramType =  "Array<" + tsType.elementType.tsType + ">";
    }
  }

  return paramType;
};

let getViewForSwagger = function(opts) {
  let swagger =
    typeof opts.swagger === "object"
      ? opts.swagger
      : JSON.parse(ts.resolveGenericTypes(opts.swagger));
  let methods = [];
  let paramsDefinitions = new Map(); // 当前需要的 params 定义
  let authorizedMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "COPY",
    "HEAD",
    "OPTIONS",
    "LINK",
    "UNLIK",
    "PURGE",
    "LOCK",
    "UNLOCK",
    "PROPFIND"
  ];
  let data = {
    title: swagger.info.title,
    description: swagger.info.description,
    className: opts.className,
    imports: opts.imports,
    methods: [],
    definitions: [],
    domain: swagger.host,
    tags: swagger.tags.map(tag => {
      return {
        ...tag,
        apiFileName: resolveAPIFileName(tag.description),
        className: resolveClassName(tag.description)
      };
    })
  };

  _.forEach(swagger.paths, function(api, path) {
    let globalParams = [];

    /**
     * @param {Object} op - meta data for the request
     * @param {string} m - HTTP method name - eg: 'get', 'post', 'put', 'delete'
     */
    _.forEach(api, function(op, m) {
      if (m.toLowerCase() === "parameters") {
        globalParams = op;
      }
    });

    _.forEach(api, function(op, m) {
      let requestMethodName = m.toLowerCase();
      if (requestMethodName === "delete") {
        requestMethodName = "del";
      }

      let M = m.toUpperCase();
      // M: POST/GET/PUT/DELETE...
      if (M === "" || authorizedMethods.indexOf(M) === -1) {
        return;
      }

      let methodName = op.operationId
        ? normalizeName(op.operationId)
        : getPathToMethodName(opts, m, path);

      methods.push(methodName);

      let method = {
        controller: op.tags[0],
        apiFileName: resolveAPIFileName(op.tags[0]),
        className: resolveClassName(op.tags[0]),
        path: resolvePathParams(path),
        methodName: methodName,
        method: M,
        methodLowerCase: m.toLowerCase(),
        requestMethodName,
        isGET: M === "GET",
        isPOST: M === "POST",
        isGraphql: _.endsWith(path, "graphql"),
        graphqlMethodName: "",
        summary: op.summary || op.description,
        parameters: [],
        queryParams: [],
        bodyParams: [],
        pathParams: [],
        responses: {},
        headers: []
      };

      let params = [];
      if (_.isArray(op.parameters)) {
        params = op.parameters;
      }

      // 处理参数
      params = params.concat(globalParams);
      _.forEach(params, function(parameter) {
        // If (_.isString(parameter.$ref)) {
        //   let segments = parameter.$ref.split("/");
        //   parameter =
        //     swagger.parameters[
        //       segments.length === 1 ? segments[0] : segments[2]
        //     ];
        // }

        if (_.has(parameter, "schema")) {
          if (_.has(parameter.schema, "$ref") && parameter.in !== "query") {
            let segments = parameter.schema.$ref.split("/");
            paramsDefinitions.set(segments[2], {
              isReq: true
            })
          }
        }

        if (method.isGraphql) {
          if (parameter.name === "query") {
            let graphqlQueryFieldsArr = parameter.description.split("{");
            if (graphqlQueryFieldsArr.length > 0) {
              method.graphqlMethodName = graphqlQueryFieldsArr[1].split("(")[0];
            }
          }
        }

        parameter.camelCaseName = _.camelCase(parameter.name);
        if (parameter.enum && parameter.enum.length === 1) {
          parameter.isSingleton = true;
          parameter.singleton = parameter.enum[0];
        }

        if (parameter.in === "body") {
          parameter.isBodyParameter = true;
          method.bodyParams.push(parameter);
        } else if (parameter.in === "path") {
          method.pathParams.push(parameter);
          parameter.isPathParameter = true;
        } else if (parameter.in === "query") {
          method.queryParams.push(parameter);
          parameter.isQueryParameter = true;
        } else if (parameter.in === "header") {
          parameter.isHeaderParameter = true;
        } else if (parameter.in === "formData") {
          parameter.isFormParameter = true;
        }

        parameter.tsType = ts.convertType(parameter);
        parameter.required = parameter.required ? "" : "?";
        parameter.priority = parameter.required ? 1 : 0;

        parameter.paramType = resolveTsType(parameter.tsType);

        if (!parameter.isHeaderParameter) {
          method.parameters.push(parameter);
        }
      });

      method.parameters.sort((a, b) => a.priority - b.priority);

      // 处理 response
      let responses = op.responses || {};
      _.forEach(responses, function(response) {
        if (_.has(response, "schema") && response.description === 'OK') {
          if (_.has(response.schema, "$ref")) {
            let segments = response.schema.$ref.split("/");
            paramsDefinitions.set(segments[2], {
              isReq: false
            })
          }

          response.tsType = ts.convertType(response);
          response.paramType = resolveTsType(response.tsType);
          method.responses = response;
        }
      });

      data.methods.push(method);
    });
  });


  // 处理 definitions，广度优先遍历
  paramsDefinitions.forEach((existDefinition, key) => {
      if (key === 'Result') return
      const definition = swagger.definitions[key];
      _.forEach(definition.properties, function(prop) {
        let definitionName = '';
        if (_.has(prop, "items") && _.has(prop.items, "$ref")) {
          definitionName = prop.items.$ref.split("/")[2];
        } else if (_.has(prop, "$ref")) {
          definitionName = prop.$ref.split("/")[2];
        }
        if (definitionName) {
          if (!paramsDefinitions.has(definitionName)) {
            console.log('发现没有出现在 methods 中的结构：', key, '->', definitionName, existDefinition.isReq ? 'req' : 'rsp');
            paramsDefinitions.set(definitionName, {
              isReq: existDefinition.isReq
            });
          }
        }
      })
    })

  _.forEach(swagger.definitions, function(definition, name) {
    if (paramsDefinitions.get(name)) {
      let tsType = ts.convertType(definition, swagger);
      tsType.properties.forEach((property) => {
        // 原子类型，不可缺省
        if (!paramsDefinitions.get(name).isReq && property.isAtomic) {
          property.optional = false;
        }
      })
      definition = {
        name: name,
        description: definition.description,
        tsType
      };
      data.definitions.push(definition);
    }
  });

  return data;
};

module.exports.getViewForSwagger = getViewForSwagger;
