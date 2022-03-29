/**
 *  created by wenxiao.li
 *  Date: 2021/6/8
 *  Time: 16:00
 *  Version: 1.0
 *  For: form helper
 */

export function helpPlaceholder(formItem: KtForm.IFormSchema) {
  switch (formItem.component) {
    case 'InputTextArea':
    case 'InputNumber':
    case 'Input':
      return `请输入${formItem.label}`;
    case 'Select':
    case 'Cascader':
      return `请选择${formItem.label}`;
    case 'DatePicker':
    case 'MonthPicker':
      return `请选择${formItem.label}`;
    case 'RangePicker':
      return ['请选择开始时间', '请选择结束时间'];
    case 'ImageUpload': {
      return `请上传${formItem.label}`;
    }
    case 'RichText': {
      return `请输入${formItem.label}内容`;
    }
    case 'Radio':
    case 'Switch':
      return `请选择${formItem.label}`;
    default: break;
  }
}

// 时间组件的类型
export const getTimeCompType = () => {
  return ['DatePicker', 'MonthPicker', 'RangePicker'];
};
