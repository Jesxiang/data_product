import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * passenger-flow-controller
 */
export class PassengerFlowAPI {

  /**
  * 导出车流指数趋势数据
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  */
  static exportIndexTendencyUsingGET(
    cityId:string,
    lotId:string,
  ) {

    return request.get<KtApi.Result>('/passenger-flow/exportIndexTendency', {
      cityId,
      lotId,
    });

  }

  /**
  * 车流指数趋势数据
  * @param {string} cityId - 城市ID
  * @param {string} lotId - 车场ID
  */
  static getIndexTendencyUsingGET(
    cityId:string,
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResultPassengerFlowIndexDto>('/passenger-flow/getIndexTendency', {
      cityId,
      lotId,
    });

  }

  /**
  * 车流指数top10
  */
  static getLotCompositeAndPassengerFlowIndexUsingGET(
  ) {

    return request.get<KtApi.AjaxResultListPassengerFlowIndexTopDto>('/passenger-flow/getIndexTop10');

  }

}
