"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var antd_dayjs_webpack_plugin_1 = __importDefault(require("antd-dayjs-webpack-plugin"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var tailwind = require('tailwindcss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var autoprefixer = require('autoprefixer');
var resolve = function (dir) { return path.join(__dirname, dir); };
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/styles/mixin.less'),
        ]
    });
}
var vueConfig = {
    productionSourceMap: process.env.VUE_APP_SOURCE_MAP === 'true',
    publicPath: '/data_product/',
    assetsDir: '.',
    // 出口文件
    outputDir: 'dist',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    tailwind,
                    autoprefixer,
                ]
            },
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new antd_dayjs_webpack_plugin_1["default"]({
                preset: 'antdv3'
            }),
        ]
    },
    chainWebpack: function (config) {
        var types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(function (type) { return addStyleResource(config.module.rule('less').oneOf(type)); });
        config.resolve.alias.set('@', resolve('src'));
        config.resolve.alias.set('@c', resolve('src/components'));
    },
    devServer: {
        port: 8911,
        disableHostCheck: true
    }
};
module.exports = vueConfig;
