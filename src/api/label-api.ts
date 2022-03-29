import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * label-controller
 */
export class LabelAPI {

  /**
  * 标签历史统计
  * @param {number} labelId - 标签ID
  * @param {string} lotId - 车场ID
  * @param {number} showDimension - 展示维度
  * @param {string} updateRule - 统计时间 day month
  * @param {string} endTime - 结束时间 2021-01-01
  * @param {string} startTime - 开始时间 2021-01-01
  */
  static getHistoryLabelCountUsingPOST(
    labelId:number,
    lotId:string,
    showDimension:number,
    updateRule:string,
    endTime?:string,
    startTime?:string,
  ) {

    return request.post<KtApi.AjaxResultLabelCountHistoryDto>('/label/getHistoryLabelCount', {
      endTime,
      labelId,
      lotId,
      showDimension,
      startTime,
      updateRule,
    });

  }

  /**
  * 标签统计
  * @param {number} labelId - 标签ID
  * @param {string} lotId - 车场ID
  * @param {number} showDimension - 展示维度
  */
  static getLabelCountUsingGET(
    labelId:number,
    lotId:string,
    showDimension:number,
  ) {

    return request.get<KtApi.AjaxResultLabelDetailDto>('/label/getLabelCount', {
      labelId,
      lotId,
      showDimension,
    });

  }

  /**
  * 标签菜单
  */
  static importLabelUsingGET(
  ) {

    return request.get<KtApi.AjaxResultListImportLabelClassifyDto>('/label/menu');

  }

}
