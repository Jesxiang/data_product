<script lang="ts">
  import {
    defineComponent, PropType, reactive, toRefs,
  } from 'vue';

  const Paging = defineComponent({
    inheritAttrs: false,
    props: {
      page: {
        type: Number,
        required: true,
      },
      limit: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      pageOptions: {
        type: Object as PropType<Partial<KtTable.Pagination>>,
        default: () => {},
      },
    },
    emits: ['update:page', 'update:limit'],
    setup(props, { emit }) {
      function pageChange(page) {
        emit('update:page', page);
      }

      function sizeChange(current, size) {
        emit('update:limit', size);
      }

      const pageOption = reactive<KtTable.Pagination>({
        disabled: false,
        hideOnSinglePage: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        showQuickJumper: true,
        showSizeChanger: true,
        showCounter: true,
        ...props.pageOptions,
      });

      return {
        pageChange,
        sizeChange,
        ...toRefs(pageOption),
      };
    },
  });

  export default Paging;
</script>

<template>
  <div class="paging">
    <div v-if="showCounter">
      共{{ count }}条记录
    </div>
    <div v-else />
    <a-pagination
      :current="page"
      :page-size="limit"
      :total="count"
      :disable="disabled"
      :show-quick-jumper="showQuickJumper"
      :show-size-changer="showSizeChanger"
      :page-size-options="pageSizeOptions"
      :hide-on-single-page="hideOnSinglePage"
      @change="pageChange"
      @showSizeChange="sizeChange"
    />
  </div>
</template>

<style lang="less">
  .paging {
    .flexDisplay(space-between, center);

    padding: 20px;

    > div {
      color: var(--mainColor1);
    }

    .ant-pagination-item-active {
      .kt-bg;

      border: none;

      > a {
        color: #fff;
      }
    }
  }
</style>
