/**
 *  created by wenxiao.li
 *  Date: 2021/6/8
 *  Time: 9:52
 *  Version: 1.0
 *  For: basic form
 */
import {
  ref, unref, onUnmounted, Ref,
} from 'vue';

export function useForm(props: KtForm.IFormProps): { methods: KtForm.IFormAction; initForm: (instance: KtForm.IFormAction) => void } {
  const formRef: Ref<KtForm.IFormAction> | Ref<null> = ref(null);

  function getForm() {
    return unref(formRef) as unknown as KtForm.IFormAction;
  }

  function initForm(instance: KtForm.IFormAction) {
    if (unref(formRef) === instance) return;
    formRef.value = instance;
    instance.setProps(props);
    onUnmounted(() => {
      formRef.value = null;
    });
  }

  const methods: KtForm.IFormAction = {
    setProps: (formProps: Partial<KtForm.IFormProps>) => {
      getForm().setProps(formProps);
    },
    updateSchema: (data: Partial<KtForm.IFormSchema> | Partial<KtForm.IFormSchema>[]) => {
      getForm().updateSchema(data);
    },
    clearValidate: (name: string | string[]) => {
      getForm().clearValidate(name);
    },
    resetFields: () => {
      getForm().resetFields();
    },
    removeSchemaByFiled: (field: string | string[]) => {
      getForm().removeSchemaByFiled(field);
    },
    getFieldValue: (field: string) => getForm().getFieldValue(field),
    getFieldsValue: () => getForm().getFieldsValue(),
    setFieldValue: (field: string, value) => {
      getForm().setFieldValue(field, value);
    },
    setFieldsValue: <T>(values: T) => {
      getForm().setFieldsValue<T>(values);
    },
    appendSchemaByField: (schema: KtForm.IFormSchema, prefixField?: string | undefined) => {
      getForm().appendSchemaByField(schema, prefixField);
    },
    validate: () => getForm().validate(),
    submit: async (): Promise<any> => getForm().submit(),
  };

  return {
    initForm,
    methods,
  };
}
