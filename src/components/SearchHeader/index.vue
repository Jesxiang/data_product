<script lang="ts">
  import {
    defineComponent, PropType, reactive, onMounted, ref, watch,
  } from 'vue';
  import { useForm } from '@ant-design-vue/use';
  import { SEARCH_PARAM } from '@/common';

  const SearchHeader = defineComponent({
    props: {
      searchParams: {
        type: Array as PropType<Array<Kt.ISearchParam>>,
        required: true,
      },
      searchActions: {
        type: Array as PropType<Array<Kt.ISearchAction>>,
        default: () => [],
      },
      premierSearch: {
        type: Boolean,
        default: () => false,
      },
      isShowPremier: {
        type: Boolean,
        default: () => false,
      },
    },
    emits: ['update:form', 'update:isShowPremier'],
    setup(props, { emit }) {
      const modelRef = reactive({});
      props.searchParams.forEach((item) => {
        modelRef[item.field] = undefined;
      });

      function disabledDate(componentProps) {
        if (componentProps && componentProps.disabledDate) {
          return componentProps.disabledDate;
        }
        return null;
      }

      watch(() => props.searchParams, () => {
        // 获取异步选项的值
        props.searchParams.forEach(async param => {
          if (param.asyncOptions) {
            param.options = await param.asyncOptions();
          }
        });
      }, {
        immediate: true,
      });

      const isShowPremierParams = ref(false);

      watch(() => isShowPremierParams.value, () => {
        emit('update:isShowPremier', isShowPremierParams.value);
      });

      onMounted(() => {
        emit('update:form', useForm(modelRef, {}));
      });

      return {
        modelRef,
        disabledDate,
        SEARCH_PARAM,
        isShowPremierParams,
      };
    },
  });

  export default SearchHeader;
</script>

<template>
  <div class="relative px-4 py-2.5 bg-white">
    <slot />
    <div class="mt-7 flex">
      <div class="search-header-form">
        <a-form>
          <a-form-item
            v-for="(param, index) of searchParams"
            :key="index"
            :name="param.field"
            :label="param.label"
          >
            <template v-if="param.type === SEARCH_PARAM.Input">
              <a-input v-model:value="modelRef[param.field]" :placeholder="param.placeholder || '请输入'" />
            </template>
            <template v-else-if="param.type === SEARCH_PARAM.Select">
              <a-select
                v-model:value="modelRef[param.field]"
                style="width: 150px;"
                placeholder="请选择"
                :options="param.options"
              />
            </template>
            <template v-else-if="param.type === SEARCH_PARAM.Date">
              <a-date-picker
                v-model:value="modelRef[param.field]"
                :show-time="param.componentProps ? param.componentProps.showTime : true"
                :disabled-date="disabledDate(param.componentProps)"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </template>
            <template v-else-if="param.type === SEARCH_PARAM.DateRange">
              <a-range-picker
                v-model:value="modelRef[param.field]"
                :show-time="param.componentProps ? param.componentProps.showTime : true"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </template>
          </a-form-item>
        </a-form>
      </div>
      <div class="flex h-40px items-center">
        <a-button
          v-for="({ type, label, func }, index) of searchActions"
          :key="index"
          :type="type"
          class="rounded-md mr-4"
          @click="func()"
        >
          {{ label }}
        </a-button>
      </div>
      <div
        v-if="premierSearch"
        class="absolute right-4 cursor-pointer text-main-1"
        @click="() => isShowPremierParams = !isShowPremierParams"
      >
        高级筛选
        <img :src="require(`@/assets/images/${isShowPremierParams ? 'folded' : 'expand'}.png`)" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less">
.search-header-form {
  .ant-form {
    .flexDisplay;

    flex-wrap: wrap;

    &-item {
      .flexDisplay;

      margin-right: 30px;
      margin-bottom: 0;

      .ant-input {
        width: 220px;
      }
    }
  }
}
</style>
