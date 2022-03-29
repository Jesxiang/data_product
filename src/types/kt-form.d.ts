/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 5:10 下午
 *  Version: 1.0
 *  For:
 */

declare namespace KtForm {
  // 栅格
  type ColType = Partial<{
    span: number;
    offset: number;
    pull: number;
    push: number;
  }>;


  type ComponentType =
    | 'Input'
    | 'InputPassword'
    | 'InputSearch'
    | 'InputTextArea'
    | 'InputNumber'
    | 'InputCountDown'
    | 'Select'
    | 'SelectOption'
    | 'TreeSelect'
    | 'Transfer'
    | 'Radio'
    | 'RadioGroup'
    | 'RadioButton'
    | 'Checkbox'
    | 'AutoComplete'
    | 'Cascader'
    | 'DatePicker'
    | 'MonthPicker'
    | 'RangePicker'
    | 'ImageUpload'
    | 'Switch'
    | 'StrengthMeter'
    | 'RichText'
    | 'Render';

// 表单字段
  interface IFormSchema {
    // 字段
    field: string;
    // 字段是否作为name
    fieldName?: boolean;
    // 标签
    label?: string;
    helpMessage?: string;
    // 组件类型
    component: ComponentType;
    // 组件属性
    componentProps?: any;
    // 验证规则
    rules?: Record<string, string> | Array<any>;
    // 必填校验
    required?: boolean;
    // 默认值
    defaultValue?: any;
    // label标签布局(覆盖form)
    labelCol?: ColType;
    // 输入控件布局(覆盖form)
    wrapperCol?: ColType;
    // 字段映射
    fieldMap?: Array<any>;
    // 是否冒号
    colon?: boolean;
    // 是否展示当前字段
    isHidden?: boolean;
    autoLink?: boolean;
  }

// 表单props 见 https://2x.antdv.com/components/form-cn
  interface IFormProps {
    // 表单配置规则
    schemas: IFormSchema[];

    // 表单内部组件大小
    size?: 'default' | 'small' | 'middle';

    // 表单布局
    layout?: 'vertical' | 'horizontal' | 'inline';

    // 是否禁用
    disabled?: boolean;

    // label标签布局
    labelCol?: ColType;

    // 输入控件布局
    wrapperCol?: ColType;

    // 时间区间字段映射成多个
    // fieldMapToTime?: FieldMapToTime;

    // 自动设置placeholder
    autoSetPlaceHolder?: boolean;

    // 是否显示收起展开按钮
    showAdvancedButton?: boolean;

    // 超过指定行数自动收起
    autoAdvancedLine?: number;

    transformDateFunc?: (date: any) => string;
  }

  interface IFormAction {
    validate(): Promise<void>;
    submit(): Promise<any>;
    setFieldsValue<T>(values: T): void;
    setFieldValue(field: string, value: any): void;
    resetFields(): void;
    updateSchema(data: Partial<IFormSchema & { value: string }> | Partial<IFormSchema>[]): void;
    setProps(formProps: Partial<IFormProps>): void;
    removeSchemaByFiled(field: string | string[]): void;
    appendSchemaByField(schema: IFormSchema, prefixField?: string): void;
    getFieldsValue: () => any;
    getFieldValue: (field: string) => any;
    clearValidate: (name: string | string[]) => void;
  }
}
