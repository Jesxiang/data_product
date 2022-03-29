import { Request } from '@/utils/request';
const request = Request.getInstance();

/**
 * analysis-report-controller
 */
export class AnalysisReportAPI {

  /**
  * 获取分析报告列表
  * @param {string} lotId - 车场ID
  * @param {number} page - 查询页数
  * @param {number} size - 页数大小
  * @param {string} year - 年份
  */
  static getReportListUsingGET(
    lotId:string,
    page:number,
    size:number,
    year?:string,
  ) {

    return request.get<KtApi.AjaxResultIPageAnalysisReport>('/analysis-report/getReportList', {
      lotId,
      page,
      size,
      year,
    });

  }

  /**
  * 获取所有分析报告年份
  * @param {string} lotId - 车场ID
  */
  static getReportYearUsingGET(
    lotId:string,
  ) {

    return request.get<KtApi.AjaxResultListstring>('/analysis-report/getReportYear', {
      lotId,
    });

  }

}
