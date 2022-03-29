import { IBasicTableOptions } from '@/vca/useTable';
import {
  defineComponent, PropType, h, toRefs,
} from 'vue';
import { Table } from 'ant-design-vue';
import Paging from '@c/Paging/index.vue';

const BasicTable = defineComponent({
  props: {
    schemas: {
      type: Array as PropType<KtTable.ITableSchema[]>,
      required: true,
    },
    tableProps: {
      type: Object as PropType<IBasicTableOptions>,
      required: true,
    },
    pageLimit: {
      type: Object as PropType<Kt.IPageLimit>,
      required: false,
      default: () => {},
    },
  },
  emits: ['sort-change'],
  setup(props, { slots, emit }) {
    const { tableProps, schemas, pageLimit } = toRefs(props);

    const onPaging = {
      'onUpdate:page': (page: number) => { pageLimit.value.page = page; },
      'onUpdate:limit': (limit: number) => { pageLimit.value.limit = limit; },
    };

    function onChange(paging, filters, sorter) {
      emit('sort-change', sorter);
    }

    function getPage() {
      return <Paging {...tableProps.value} {...pageLimit.value} {...onPaging} />;
    }

    return () => (
        <div>
          {h(
            Table,
            {
              ...tableProps.value,
              columns: schemas.value,
              pagination: false,
              onChange,
            },
            slots,
          )}
          {tableProps.value.pagination && getPage()}
        </div>
    );
  },
});

export default BasicTable;
