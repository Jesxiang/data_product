/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 2:37 下午
 *  Version: 1.0
 *  For: table hooks
 */
import {
  createVNode,
  ref, toRefs, watch,
} from 'vue';
import { usePage } from './usePage';
import { Empty } from 'ant-design-vue';

/* eslint-disable no-use-before-define */

export interface IBaseOptions extends KtTable.ITableProps {
  pageSize: number;
  pageOptions: Partial<KtTable.Pagination>;
  form: any;
  // 表格是否有数据
  hasData: boolean;
  // 是否立即调用请求
  lazyLoad: boolean;
  locale?: any
}

export interface IBasicTableOptions extends IBaseOptions {
  count: number;
  loading: boolean;
  dataSource: any[] | undefined;
}

// eslint-disable-next-line no-unused-vars
export declare type Service<T> = (...args: any) => Promise<T>;

export function useTable(service: Service<any>, options: Partial<IBaseOptions>) {
  const baseOptions: IBaseOptions = {
    hasData: true,
    pageSize: 10,
    bordered: false,
    size: 'default',
    pageOptions: {},
    rowKey: (r, i) => i,
    pagination: true,
    form: null,
    lazyLoad: false,
    locale: {},
  };

  const tableProps = ref<IBasicTableOptions>({
    ...baseOptions,
    ...options,
    loading: false,
    dataSource: undefined,
    count: 0,
  });

  // 空数据时的 展示
  const emptyText = tableProps.value.locale?.emptyText || createVNode(Empty, { image: createVNode(Empty.PRESENTED_IMAGE_SIMPLE) });

  const { pageLimit, resetPageLimit } = usePage(runService, tableProps.value.pageSize);

  const search = {
    submit: runService,
    reset: resetPageAndForm,
  };

  // 重置 分页参数 和 表单
  function resetPageAndForm() {
    tableProps.value.form && tableProps.value.form.resetFields();
    tableProps.value.pagination && resetPageLimit();
  }

  watch(() => tableProps.value.loading, (value) => {
    // 加载中 不能显示空数据
    if (value) {
      tableProps.value.locale.emptyText = '数据加载中......';
    } else {
      tableProps.value.locale.emptyText = emptyText;
    }
  });

  async function runService() {
    const {
      loading, pagination, dataSource, count, form,
    } = toRefs(tableProps.value);
    loading.value = true;
    try {
      const res = await service(pageLimit.value, form.value ? form.value.modelRef : {});
      // 总条数为0 表示 没有数据
      tableProps.value.hasData = !!res.total;
      if (pagination?.value) {
        dataSource.value = res.records;
        count.value = res.total;
      } else {
        dataSource.value = res;
      }
    } finally {
      loading.value = false;
    }
  }

  tableProps.value.lazyLoad || runService();

  return {
    search,
    tableProps,
    pageLimit,
  };
}
