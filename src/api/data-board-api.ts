import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * data-board-controller
 */
export class DataBoardAPI {

  /**
  * 导出指标趋势数据
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  */
  static exportIndexTendencyUsingGET(
    cityId:string,
    lotId:string,
  ) {

    return request.get<KtApi.Result>('/data-board/exportIndexTendency', {
      cityId,
      lotId,
    });

  }

  /**
  * 获取商业综合指数及车流指数
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  */
  static getLotCompositeAndPassengerFlowIndexUsingGET(
    cityId:string,
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResultDataBoardIndexDto>('/data-board/getCompositeIndex', {
      cityId,
      lotId,
    });

  }

  /**
  * 指标趋势数据
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  */
  static getIndexTendencyUsingGET(
    cityId:string,
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResultListSynthesizeIndexDto>('/data-board/getIndexTendency', {
      cityId,
      lotId,
    });

  }

}
