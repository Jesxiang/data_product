import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * lot-composite-controller
 */
export class LotCompositeAPI {

  /**
  * 获取商业综合指数top10
  */
  static getLotCompositeAndPassengerFlowIndexUsingGET(
  ) {

    return request.get<KtApi.AjaxResultListSynthesizeDimensionTopDto>('/lot-composite/getIndexTop10');

  }

}
