import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * common-controller
 */
export class CommonAPI {

  /**
  * 获取系统字典信息
  */
  static getSystemDictionaryUsingGET(
  ) {

    return request.get<KtApi.AjaxResult>('/common/getSystemDictionary');

  }

  /**
  * 匹配用户信息
  */
  static matchUserUsingGET(
  ) {

    return request.get<KtApi.AjaxResult>('/common/matchUser');

  }

}
