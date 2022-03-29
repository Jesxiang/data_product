/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 11:05 上午
 *  Version: 1.0
 *  For: global数据
 */
import { createApp } from 'vue';

let app: any = null;

// 返回app
export const getApp = (App) => {
  app || (app = createApp(App));
  return app;
};

/**
 * @desc 获取全局数据
 * @author lllwx
 * @date 2021/6/1 11:16 上午
 * @param { string } key 键值
 * @return
 */
export const getGlobalData = (key: string) => {
  if (key && Object.prototype.hasOwnProperty.call(app.config.globalProperties, key)) {
    return app.config.globalProperties[key];
  }
  throw new Error('没有这个全局数据');
};
