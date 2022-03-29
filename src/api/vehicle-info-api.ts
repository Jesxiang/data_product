import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * vehicle-info-controller
 */
export class VehicleInfoAPI {

  /**
  * 新建车辆信息
  * @param {string} carPlateNum - 车牌号
  * @param {number} customerNum - 客户编号
  * @param {string} lotId - 车场ID
  * @param {string} carLogo - 车标
  * @param {string} estimate - 价格预估
  */
  static addVehicleInfoUsingPOST(
    carPlateNum:string,
    customerNum:number,
    lotId:string,
    carLogo?:string,
    estimate?:string,
  ) {

    return request.post<KtApi.AjaxResult>('/vehicle-info/add', {
      carLogo,
      carPlateNum,
      customerNum,
      estimate,
      lotId,
    });

  }

}
