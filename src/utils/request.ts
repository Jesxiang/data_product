/**
 *  created by lllwx
 *  Date: 2021/6/2
 *  Time: 1:51 下午
 *  Version: 1.0
 *  For:
 */
import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import { HTTP_STATUS } from '@/common';
import { message } from 'ant-design-vue';
import qs from 'qs';

const successCode = [HTTP_STATUS.ACCEPTED, HTTP_STATUS.CREATED, HTTP_STATUS.SUCCESS, HTTP_STATUS.DELETE_SUCCESS];

const serverErrorCode = [HTTP_STATUS.SERVER_ERROR, HTTP_STATUS.GATEWAY_TIMEOUT, HTTP_STATUS.BAD_GATEWAY, HTTP_STATUS.SERVICE_UNAVAILABLE];

export const formType = {
  'content-type': 'application/x-www-form-urlencoded',
};

export const fileType = {
  'content-type': 'multipart/form-data',
};

export class Request {
  // 唯一实例
  private static instance: undefined | Request;

  // 请求对象
  private service: AxiosInstance;

  // 单例获取
  public static getInstance(): Request {
    this.instance || (this.instance = new Request());

    return this.instance;
  }

  constructor() {
    this.service = axios.create({
      // @ts-ignore
      baseURL: process.env.VUE_APP_BASE_URL as string,
      // @ts-ignore
      timeout: Number.parseInt(process.env.VUE_APP_TIME_OUT, 10),
    });
    this.requestInterceptors();
    this.responseInterceptors();
  }

  // 请求拦截
  protected requestInterceptors(): void {
    this.service.interceptors.request.use(
      async (config: AxiosRequestConfig) => config,
      (error: AxiosError) => Promise.reject(error),
    );
  }

  // 响应拦截
  protected responseInterceptors(): void {
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 200
        if (successCode.indexOf(response.status) !== -1) {
          // 接口返回200
          if (successCode.indexOf(response.data.code) !== -1) {
            return response.data.data;
          }
          message.error(response.data.message, 2);

          return Promise.reject(response.data);

        }
        if (serverErrorCode.indexOf(response.status) !== -1) {
          // TODO 服务器错误
          message.error('网络繁忙');
        } else {
          // TODO 请求错误
        }
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  /**
   * get请求
   * @param {string} url
   * @param params
   * @param {object} config
   * @returns {Promise<AxiosResponse<any>>}
   */
  public async get<T = any>(url: string, params: any = {}, config: Record<string, string> = {}): Promise<T> {
    return await this.service.get(url, {
      ...config,
      params,
    });
  }

  /**
   * post 请求
   * @param {string} url
   * @param data
   * @param {object} header
   * @returns {Promise<AxiosResponse<any>>}
   */
  public async post<T = any>(url: string, data: any = {}, header: Record<string, string> = { ...formType }): Promise<T> {
    if (header['content-type'] === 'application/x-www-form-urlencoded') {
      data = qs.stringify(data);
    }
    return await this.service.post(url, data, {
      headers: header,
    });
  }

  /**
   * delete 请求
   * @param {string} url
   * @param params
   * @returns {Promise<any>}
   */
  public async delete<T = any>(url: string, params: any = {}): Promise<T> {
    return await this.service.delete(url, {
      params,
    });
  }
}
