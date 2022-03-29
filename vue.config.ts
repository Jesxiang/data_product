/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 11:34 上午
 *  Version: 1.0
 *  For: vue-cli配置文件
 */
import type { ProjectOptions } from '@vue/cli-service';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwind = require('tailwindcss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer');
const resolve = (dir: string) => path.join(__dirname, dir);

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/mixin.less'),
      ],
    });
}
const vueConfig: ProjectOptions = {
  productionSourceMap: process.env.VUE_APP_SOURCE_MAP === 'true',
  publicPath: '/data_product/', // 部署应用包时的基本 URL
  assetsDir: '.',
  // 出口文件
  outputDir: 'dist',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwind,
          autoprefixer,
        ],
      },
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new AntdDayjsWebpackPlugin({
        preset: 'antdv3',
      }),
    ],
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)));
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('@c', resolve('src/components'));
  },
  devServer: {
    port: 8911,
    disableHostCheck: true,
  },
};

module.exports = vueConfig;
