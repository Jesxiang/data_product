/**
 *  created by lllwx
 *  Date: 2021/6/2
 *  Time: 1:53 下午
 *  Version: 1.0
 *  For: 常用枚举
 */

/* eslint-disable */

export enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED,
  ACCEPTED,
  AUTHENTICATE = 301,
  CLIENT_ERROR = 400,
  FORBIDDEN = 403,
  NOT_FOUND,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT,
  // 自定义 删除成功
  DELETE_SUCCESS = 2000
}

// 搜索参数类型
export enum SEARCH_PARAM {
  Input,
  Select,
  Date,
  DateRange,
}
