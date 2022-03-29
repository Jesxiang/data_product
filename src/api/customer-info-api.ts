import { fileType, Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * customer-info-controller
 */
export class CustomerInfoAPI {

  /**
  * 新建客户标签
  * @param {number} customerNum - 客户编号
  * @param {Array<number>} labels - 标签数组
  * @param {string} lotId - 车场ID
  */
  static addCustomerLabelUsingPOST(
    customerNum:number,
    labels:Array<number>,
    lotId:string,
  ) {

    return request.post<KtApi.AjaxResult>('/customer-info/addCustomerLabel', {
      customerNum,
      labels,
      lotId,
    });

  }

  /**
  * 导入客户信息
  * @param {string} cityId - 城市ID
  * @param {any} file - 导入文件
  * @param {string} lotId - 车场ID
  * @param {Array<number>} labels - 标签数组
  */
  static customerInfoImportUsingPOST(
    file:any,
  ) {

    return request.post<KtApi.AjaxResult>('/customer-info/customerInfoImport', file, { ...fileType });

  }

  /**
  * 删除客户
  * @param {number} customerNum - 客户编号
  * @param {string} lotId - 车场ID
  */
  static deleteCustomerInfoUsingGET(
    customerNum:number,
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResult>('/customer-info/delete', {
      customerNum,
      lotId,
    });

  }

  /**
  * 导出客户列表
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  * @param {Array<number>} customerNums - 客户编号集合
  * @param {Array<string>} labelValue - 标签ID-标签值 1025-3
  * @param {number} matchingResult - 匹配结果
  * @param {number} membershipLevel - 会员等级
  * @param {string} query - 输入查询
  */
  static exportCustomerListUsingGET(
    cityId:string,
    lotId:string,
    customerNums?:Array<number>,
    labelValue?:Array<string>,
    matchingResult?:number,
    membershipLevel?:number,
    query?:string,
  ) {

    return request.get<KtApi.Result>('/customer-info/exportCustomerList', {
      cityId,
      customerNums,
      labelValue,
      lotId,
      matchingResult,
      membershipLevel,
      query,
    });

  }

  /**
  * 获取客户详情
  * @param {number} customerNum - 客户编号
  * @param {string} lotId - 车场ID
  */
  static getCustomerInfoUsingGET(
    customerNum:number,
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResultCustomerInfoDetailDto>('/customer-info/getCustomerInfo', {
      customerNum,
      lotId,
    });

  }

  /**
  * 获取客户列表
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  * @param {number} page - 查询页数
  * @param {number} size - 页数大小
  * @param {Array<string>} labelValue - 标签ID-标签值 1025-3
  * @param {number} matchingResult - 匹配结果
  * @param {number} membershipLevel - 会员等级
  * @param {string} query - 输入查询
  */
  static getCustomerInfoListUsingPOST(
    cityId:string,
    lotId:string,
    page:number,
    size:number,
    labelValue?:Array<string>,
    matchingResult?:number,
    membershipLevel?:number,
    query?:string,
  ) {

    return request.post<KtApi.AjaxResultIPageCustomerInfoListDto>('/customer-info/getCustomerInfoList', {
      cityId,
      labelValue,
      lotId,
      matchingResult,
      membershipLevel,
      page,
      query,
      size,
    });

  }

  /**
  * 导入客户标签筛选条件
  * @param {number} customerNum - 客户编号
  * @param {string} lotId - 车场ID
  */
  static importLabelUsingGET(
    customerNum?:number,
    lotId?:string,
  ) {

    return request.get<KtApi.AjaxResultListImportLabelClassifyDto>('/customer-info/importLabel', {
      customerNum,
      lotId,
    });

  }

  /**
  * 查询客户标签筛选条件
  */
  static queryLabelUsingGET(
  ) {

    return request.get<KtApi.AjaxResultListQueryLabelClassifyDto>('/customer-info/queryLabel');

  }

  /**
  * 导入客户模板下载
  */
  static templateDownloadUsingGET(
  ) {

    return request.get<KtApi.Result>('/customer-info/templateDownload');

  }

  /**
  * 修改客户
  * @param {number} customerNum - 用户编号
  * @param {string} lotId - 车场ID
  * @param {string} birthday - 生日
  * @param {string} name - 用户名
  * @param {string} phone - 手机号
  * @param {string} remark - 备注
  * @param {number} sex - 性别 1男 0 女
  * @param {number} usableScore - 可用积分
  */
  static updateCustomerInfoUsingPOST(
    customerNum:number,
    lotId:string,
    birthday?:string,
    name?:string,
    phone?:string,
    remark?:string,
    sex?:number,
    usableScore?:number,
  ) {

    return request.post<KtApi.AjaxResult>('/customer-info/update', {
      birthday,
      customerNum,
      lotId,
      name,
      phone,
      remark,
      sex,
      usableScore,
    });

  }

}
