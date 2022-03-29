<script lang="ts">
  import {
    defineComponent, ref, PropType, reactive, onMounted, onBeforeUnmount, unref, toRaw, computed, watch,
  } from 'vue';
  import { deepMerge } from '@/utils';
  import FormItem from './FormItem';

  const BasicForm = defineComponent({
    components: {
      FormItem,
    },
    props: {
      basicProps: {
        type: Object as PropType<KtForm.IFormProps>,
        default: () => {
          return {
            schemas: [],
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            layout: 'vertical',
            disabled: false,
          };
        },
      },
    },
    emits: ['init-form'],
    setup(props, { emit }) {
      // 表单数据
      const formModel = reactive({});

      // 表单ref
      const basicFormRef: any = ref(null);
      const schemaRef = ref<KtForm.IFormSchema[] | null>(null);
      // Props Ref
      const propsRef = ref({});
      // 合并默认Form参数
      propsRef.value = deepMerge({}, props.basicProps);
      const getMergePropsRef = computed(
        (): KtForm.IFormProps => {
          return deepMerge(toRaw(props.basicProps), unref(propsRef));
        },
      );

      // 所有表单项
      const getSchema = computed((): KtForm.IFormSchema[] => {
        return unref(schemaRef) || (unref(getProps.value.schemas.filter(schema => !schema.isHidden)));
      });

      // 获取表单基本配置
      const getProps = computed(
        (): KtForm.IFormProps => {
          return {
            ...unref(getMergePropsRef),
          };
        },
      );

      // 修改schema 更新formModel
      watch(getSchema, () => {
        unref(getSchema).forEach((schema: KtForm.IFormSchema) => {
          if (!Object.keys(formModel).includes(schema.field)) {
            formModel[schema.field] = schema.defaultValue;
          }
        });
      });

      const setDefaultValue = () => {
        const schemas = unref(getSchema);
        schemas.forEach((schema: KtForm.IFormSchema) => {
          formModel[schema.field] = schema.defaultValue;
        });
      };

      // 表单项的值
      function getFieldValue(field: string): any {
        return formModel[field];
      }

      function getFieldsValue(): any {
        return formModel;
      }

      // 编辑的对象所有值
      const editForm = ref({});
      // 设置表单值
      function setFieldsValue<T>(value: T) {
        editForm.value = value;
        unref(getSchema).forEach(schema => {
          if (schema.component === 'RangePicker') {
            // 日期范围选择
            // formModel[schema.field] = [];
            // schema.fieldMap.forEach(field => {
            //   formModel[schema.field].push(moment(value[field]));
            // });
          } else if (schema.component === 'Cascader') {
            // 级联地址选择
            formModel[schema.field] = schema.fieldMap?.map(item => {
              return value[item];
            });
          } else {
            (value[schema.field] !== null && value[schema.field] !== undefined) && (formModel[schema.field] = value[schema.field]);
          }
        });
      }

      // 设置表单项的值
      function setFieldValue(field: string, value: any) {
        Object.prototype.hasOwnProperty.call(formModel, field) && (formModel[field] = value);
      }

      // 清空初始值
      function clearFormDefault() {
        unref(getSchema).forEach(schema => {
          if (schema.component === 'RangePicker') {
            schema.defaultValue = [];
          } else {
            schema.defaultValue = '';
          }
        });
      }

      // 表单重置
      function resetFields(): void {
        editForm.value = {};
        basicFormRef.value.resetFields();
      }

      // 验证表单
      async function validate() {
        return basicFormRef.value.validate();
      }

      // 更新字段
      function updateSchema({ value, field }) {
        unref(getSchema).forEach((schema: KtForm.IFormSchema) => {
          if (schema.field === field) {
            formModel[field] = value;
          }
        });
      }

      // 设置当前form props
      function setProps(formProps: KtForm.IFormProps) {
        propsRef.value = deepMerge(unref(propsRef), formProps);
        setDefaultValue();
      }

      // 提交表单
      async function submit() {
        try {
          await validate();
          return handleSubmitForm(unref(formModel));
        } catch (e) {
          throw new Error(e);
        }
      }

      // 处理要提交的表单数据
      function handleSubmitForm(model: any) {
        // 所有表单项
        const keys = Object.keys(model);
        unref(getSchema).forEach((schema: KtForm.IFormSchema) => {
          if (keys.includes(schema.field)) {
            // 处理range picker
            if (schema.component === 'RangePicker') {
              const rangeValue = model[schema.field];
              // rangeValue 通过fieldMap 映射
              if (rangeValue && rangeValue.length) {
                rangeValue.forEach((value, index) => {
                  if (schema.fieldMap) {
                    model[schema.fieldMap[index]] = new Date(value).getTime();
                  }
                });
              }
            }
            if (schema.component === 'Cascader') {
              const value = model[schema.field];
              value.forEach((cValue, index) => {
                if (schema.fieldMap) {
                  model[schema.fieldMap[index]] = cValue;
                }
              });
            }
          }
        });
        // 编辑前的值
        editForm.value && (model = { ...editForm.value, ...model });
        return model;
      }

      function removeSchemaByFiled() {}

      function appendSchemaByField() {}

      function clearValidate(name: string | string[]) {
        if (name instanceof Array) {
          name.forEach(item => basicFormRef.value!.clearValidate(item));
        } else {
          basicFormRef.value!.clearValidate(name);
        }
      }

      const methods: KtForm.IFormAction = {
        getFieldsValue,
        setFieldValue,
        setFieldsValue,
        resetFields,
        updateSchema,
        setProps,
        submit,
        validate,
        getFieldValue,
        removeSchemaByFiled,
        appendSchemaByField,
        clearValidate,
      };

      onMounted(() => {
        emit('init-form', methods);
      });
      onBeforeUnmount(() => {
        clearFormDefault();
      });

      return {
        formModel,
        basicFormRef,
        propsRef,
        getSchema,
        updateSchema,
      };
    },
  });

  export default BasicForm;
</script>

<template>
  <a-form
    ref="basicFormRef"
    v-bind="$attrs"
    :model="formModel"
    :label-col="propsRef.labelCol"
    :wrapper-col="propsRef.wrapperCol"
    :layout="propsRef.layout"
    class="basic-form"
  >
    <form-item
      v-for="(schema, index) of getSchema"
      :key="index"
      :schema="schema"
      :form-model="formModel"
      :disabled="propsRef.disabled"
    />
    <slot />
  </a-form>
</template>

<style lang='less'>
.basic-form {
  position: relative;

  .ant-input-number {
    width: 100% !important;
  }
}
</style>
