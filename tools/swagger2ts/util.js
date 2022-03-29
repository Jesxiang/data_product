'use strict';

var _ = require('lodash');

/**
 * Recursively converts a swagger type description into a typescript type, i.e., a model for our mustache
 * template.
 *
 * Not all type are currently supported, but they should be straightforward to add.
 *
 * @param swaggerType a swagger type definition, i.e., the right hand side of a swagger type definition.
 * @returns a recursive structure representing the type, which can be used as a template model.
 */
function convertType(swaggerType, swagger) {
    var typespec = {
        description: swaggerType.description,
        isEnum: false,
    };

    if (swaggerType.hasOwnProperty('schema')) {
        return convertType(swaggerType.schema);
    }

    if (_.isString(swaggerType.$ref)) {
        typespec.tsType = 'ref';
        typespec.target = resolveGenericTypes(swaggerType.$ref.substring(swaggerType.$ref.lastIndexOf('/') + 1));
    } else if (swaggerType.hasOwnProperty('enum')) {
        typespec.tsType = swaggerType.enum
            .map(function (str) {
                return JSON.stringify(str);
            })
            .join(' | ');
        typespec.isAtomic = true;
        typespec.isEnum = true;
    } else if (swaggerType.type === 'string') {
        typespec.tsType = 'string';
    } else if (swaggerType.type === 'number' || swaggerType.type === 'integer') {
        typespec.tsType = 'number';
    } else if (swaggerType.type === 'boolean') {
        typespec.tsType = 'boolean';
    } else if (swaggerType.type === 'array') {
        typespec.tsType = 'array';
        typespec.elementType = convertType(swaggerType.items);
    }
    else if (swaggerType.type === 'object') {
        typespec.tsType = 'object';
        typespec.properties = [];
        if (swaggerType.allOf) {
            _.forEach(swaggerType.allOf, function (ref) {
                if (ref.$ref) {
                    var refSegments = ref.$ref.split('/');
                    var name = refSegments[refSegments.length - 1];
                    _.forEach(swagger.definitions, function (definition, definitionName) {
                        if (definitionName === name) {
                            var property = convertType(definition, swagger);
                            Array.prototype.push.apply(typespec.properties, property.properties);
                        }
                    });
                } else {
                    var property = convertType(ref);
                    Array.prototype.push.apply(typespec.properties, property.properties);
                }
            });
        }

        if (swaggerType.additionalProperties && swaggerType.additionalProperties.type) {
            typespec.recordType = swaggerType.additionalProperties.type;
        }

        _.forEach(swaggerType.properties, function (propertyType, propertyName) {
            if (propertyName === 'code' || propertyName === 'message') return
            var property = convertType(propertyType);
            property.name = propertyName;

            property.optional = true;
            if (swaggerType.required && swaggerType.required.indexOf(propertyName) !== -1) {
                property.optional = false;
            }

            typespec.properties.push(property);
        });
    } else {
        typespec.tsType = 'any';
    }

    typespec.isRef = typespec.tsType === 'ref';
    typespec.isObject = typespec.tsType === 'object';
    typespec.isArray = typespec.tsType === 'array';
    typespec.isAtomic = typespec.isAtomic || _.includes(['string', 'number', 'boolean', 'any'], typespec.tsType);

    return typespec;
}

// AbcListPage«WeappRegistrationOutpatientListView» -> AbcListPageWeappRegistrationOutpatientListView
function resolveGenericTypes(genericTypeStr) {
    return genericTypeStr.replace(/«|»/g, '');
}

module.exports.convertType = convertType;
module.exports.resolveGenericTypes = resolveGenericTypes;
