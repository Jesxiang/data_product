/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 2:53 下午
 *  Version: 1.0
 *  For:
 */
declare namespace Kt {
  export interface IPageLimit {
    limit: number;
    page: number;
  }

  export interface IPageData<T> {
    count: number;
    data: Array<T>;
  }

  // 搜索参数
  export interface ISearchParam {
    field: string;
    label: string;
    type: 0 | 1 | 2 | 3;
    placeholder?: string;
    options?: Array<{ label: string; value: string | number }>;
    componentProps?: any;
    filter?: any;
    // 异步选项的数据
    asyncOptions?: () =>
      Promise<Array<{ label: string; value: string | number }>>
  }

  export interface ISearchAction {
    label: string;
    type: 'default' | 'primary' | 'danger';
    func: (...params) => void;
  }
}
