/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 11:12 上午
 *  Version: 1.0
 *  For:
 */

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export { getApp, getGlobalData } from './global';

export { MEMBERSHIP_LEVEL_KEY, MATCHING_RESULT_KEY, SHOW_DIMENSION_KEY } from './key';

dayjs.extend(duration);

/**
 * @desc 对日期进行标准格式化
 * @author lllwx
 * @date 2021/6/1 11:13 上午
 * @param {string | Date} date 日期对象 或 时间字符串
 * @param {string} format 格式化标准
 * @return {string}
 */
export function formatTime(date: string | Date | number, format?: string): string {
  const baseFormat = 'YYYY-MM-DD HH:mm:ss';
  if (!date) return '';
  return dayjs(date).format(format || baseFormat);
}

/**
 * @desc 下载拼接url
 * @author lllwx
 * @date 2021/6/10 11:53 下午
 * @param {string} uri 连接
 * @param {string} key 参数字段
 * @param {string | number | Array } value 参数值
 * @return {string}
 */
function addParam(uri: string, key: string, value: string | number | []) {
  if (!value) {
    return uri;
  }
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  let keyValueStr = `${key}=${value}`;
  // 数组参数处理
  if (value instanceof Array) {
    keyValueStr = '';
    value.forEach(_ => {
      keyValueStr = `${keyValueStr}${key}=${_}&`;
    });
  }
  if (uri.match(re)) {
    return uri.replace(re, `$1${keyValueStr}$2`);
  }
  return `${uri + separator + keyValueStr}`;

}

/**
 * @desc a标签下载文件
 * @author lllwx
 * @date 2021/6/10 11:53 下午
 * @param {string} request 请求url
 * @param {object} params 参数
 * @return
 */
export function downloadFile(request: string, params = {}) {
  const a = document.createElement('a');
  let url = `${process.env.VUE_APP_BASE_URL}${request}`;
  Object.keys(params).forEach(i => {
    url = addParam(url, i, params[i]);
  });
  a.href = url;
  console.log(url);
  a.click();
}

/**
 * @desc 获取uuid
 * @author lllwx
 * @date 2021/6/1 11:13 上午
 * @return { string }
 */
export function guid(): string {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

// 合并
export function deepMerge<T = any>(src: any, target: any): T {
  Object.keys(target).forEach(key => {
    src[key] = src[key] && src[key].toString() === '[object Object]'
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  });
  return src;
}

// 下载本地图片
export const downloadImg = (img: string, name: string): void => {
  const image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = img;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL('image/png');
    // 生成一个a元素
    const a = document.createElement('a');
    // 创建一个单击事件
    const event = new MouseEvent('click');
    // 设置图片名称
    a.download = name || 'photo';
    a.href = url;
    a.dispatchEvent(event);
    document.removeChild(a);
  };
};
