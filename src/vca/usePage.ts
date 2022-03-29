/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 2:41 下午
 *  Version: 1.0
 *  For: 分页
 */
import { ref, watch, unref } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-types
export function usePage(queryList: Function, pageSize = 10) {
  const basePage = 1;

  const pageLimit = ref<Kt.IPageLimit>({
    page: basePage,
    limit: 0,
  });

  pageLimit.value.limit = pageSize;

  watch(pageLimit.value, () => queryList());

  // 重置分页条件
  function resetPageLimit() {
    if (unref(pageLimit).page === basePage && unref(pageLimit).limit === pageSize) {
      queryList();
    } else {
      pageLimit.value.page = basePage;
      pageLimit.value.limit = pageSize;
    }
  }

  return {
    pageLimit,
    resetPageLimit,
  };
}
