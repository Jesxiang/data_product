'use strict';
const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const index = require('./codegen');
const got = require('got');
function format(date, fmt) {
    const o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
}

const generateTime = format(new Date(), 'yyyy-MM-dd hh:mm:ss');

// 不需要生成的 controller
const blackList = [];

async function start() {
    try {
        const swaggerSchema = await getSwaggerSchema();
        generate(swaggerSchema);
    } catch (e) {
        console.log('生成失败', e);
    }

    console.log('生成完毕..', generateTime);
}

async function getSwaggerSchema() {
    const res = await got('http://117.173.153.92:57019/v2/api-docs?group=KeyTop%EF%BC%88%E5%95%86%E4%B8%9A%E5%A4%A7%E6%95%B0%E6%8D%AE%E6%9F%A5%E8%AF%A2%E5%B9%B3%E5%8F%B0%EF%BC%89', {
        headers: {
        },
        responseType: 'json'
    })
    return res.body;
}

function generate(schema) {
    // const swagger = fs.readJsonSync(path.resolve('/Users/lllwx/Desktop/api-docs.json'));
    const swaggerData = index.getViewForSwagger({
        swagger: JSON.stringify(schema),
        className: 'KtApi',
    });

    function copyTpl(templatePath, destPath, data) {
        ejs.renderFile(templatePath, { ...data, generateTime }, {}, function (err, str) {
            let destDir = path.resolve(process.cwd(), path.dirname(destPath));
            // Console.log("destDir", destDir);
            if (!fs.existsSync(destDir)) {
                console.log('创建文件夹', destDir);
                fs.mkdirSync(destDir);
            }

            fs.writeFileSync(destPath, str);
        });
    }

    // 生成 API
    swaggerData.tags.forEach((tag) => {
        const { className, apiFileName, description, name } = tag;
        // 排除黑名单
        if (blackList.indexOf(name) !== -1) {
            return;
        }
        const methods = swaggerData.methods.filter((method) => method.className === name);
        copyTpl(
          './tools/swagger2ts/templates/api.ejs',
          `./src/api/${apiFileName}.ts`,
          {
              className,
              description,
              methods,
          }
        );
    });

    // 添加result类型
    swaggerData.definitions.push({
        description: '接口返回统一对象',
        name: 'Result',
        tsType: {
            "description": "接口返回统一对象",
            "isEnum": false,
            "tsType": "object",
            "properties": [
                {
                    "description": "业务数据",
                    "isEnum": false,
                    "tsType": "object",
                    "isRef": false,
                    "isObject": true,
                    "isArray": false,
                    "isAtomic": true,
                    "name": "data",
                    "optional": false
                },
            ],
            "isRef": false,
            "isObject": true,
            "isArray": false,
            "isAtomic": false
        }
    })

    // 生成 definitions
    swaggerData.definitions.filter(definition => definition.description !== '接口返回统一对象').forEach((definition) => {
        copyTpl(
          './tools/swagger2ts/templates/definition.ejs',
          `./src/types/api/${definition.name}.d.ts`,
          definition
        );
    });

    // response definitions
    swaggerData.definitions.filter(definition => definition.description === '接口返回统一对象').forEach((definition) => {
        // 默认的result类型
        if (definition.name === 'AjaxResult') {
            definition.tsType.properties[0].isAtomic = true
            console.log(definition)
        }
        copyTpl(
          './tools/swagger2ts/templates/res-definition.ejs',
          `./src/types/api/${definition.name}.d.ts`,
          definition
        );
    })

}

start();

