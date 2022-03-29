import {
  defineComponent, PropType, toRefs, unref,
} from 'vue';
import {
  Form, Input, Select, DatePicker, InputNumber, Col, Cascader, Switch, Radio,
} from 'ant-design-vue';
import { helpPlaceholder } from './helper';

const componentMap = new Map<KtForm.ComponentType, any>();
componentMap
  .set('Input', Input)
  .set('InputNumber', InputNumber)
  .set('InputTextArea', Input.TextArea)
  .set('Select', Select)
  .set('DatePicker', DatePicker)
  .set('RangePicker', DatePicker.RangePicker)
  .set('Cascader', Cascader)
  .set('Switch', Switch)
  .set('Radio', Radio)
  .set('RadioGroup', Radio.Group);

const FormItem = defineComponent({
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<KtForm.IFormSchema>,
      required: true,
    },
    formModel: {
      required: true,
      type: Object,
    },
    disabled: {
      required: true,
      type: Boolean,
    },
  },
  setup(props) {
    const { schema, formModel, disabled } = toRefs(props);

    function handleRules() {
      const { required, rules } = schema.value;
      const fieldRule: any = [];
      if (rules) {
        rules instanceof Object && (fieldRule.push(rules));
        rules instanceof Array && (fieldRule.push(...rules));
      }
      if (required !== false) {
        const rule = {
          required: true,
          message: helpPlaceholder(unref(schema)),
        };
        if (schema.value.component === 'RangePicker') {
          (rule as any).type = 'array';
        }
        if (schema.value.component === 'InputNumber') {
          (rule as any).type = 'number';
        }
        (fieldRule as Array<any>).unshift(rule);
      }
      return fieldRule;
    }

    function getItemProps() {
      return {
        filed: schema.value.field,
        labelCol: schema.value.labelCol,
        wrapperCol: schema.value.wrapperCol,
        colon: schema.value.colon || true,
        rules: handleRules(),
        autoLink: schema.value.autoLink || true,
      };
    }

    function getComponent() {
      const tempSchema = unref(schema);
      const isCheck = ['Switch'].includes(tempSchema.component);

      const bindValue = {
        [isCheck ? 'checked' : 'value']: formModel.value[tempSchema.field],
      };
      const eventKey = 'onChange';
      const on = {
        [eventKey]: (e: any) => {
          const value = (e && e.target) ? e.target.value : e;
          if (tempSchema.componentProps && tempSchema.componentProps[eventKey]) {
            tempSchema.componentProps[eventKey](value);
          }
          // 组件输入的值
          formModel.value[tempSchema.field] = value;
        },
      };
      const Component = componentMap.get(tempSchema.component);
      return (
        <div
          style={ tempSchema.helpMessage || (tempSchema.componentProps && tempSchema.componentProps.slot
            ? { display: 'flex', alignItems: 'center' } : '')}
        >
          <Component
            placeholder={helpPlaceholder(tempSchema)}
            disabled={disabled.value}
            { ...bindValue }
            { ...tempSchema.componentProps }
            { ...on }
          />
          {
            tempSchema.componentProps && tempSchema.componentProps.slot ? tempSchema.componentProps.slot() : null
          }
          {
            tempSchema.helpMessage ? (
              <span style={{ fontSize: '12px', color: '#a9a9a9' }}>
                { tempSchema.helpMessage }
              </span>
            ) : null
          }
        </div>
      );
    }

    function renderItem() {
      const { field, label, fieldName } = schema.value;
      return (
        <Form.Item
          name={ fieldName === false ? undefined : field as string}
          label={label}
          { ...getItemProps() }
        >
          {
            () => getComponent()
          }
        </Form.Item>
      );
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { schema } = props;
      const { component } = schema;
      if (!componentMap.has(component)) return null;

      const getItem = () => {
        // 可以加入slot
        return renderItem();
      };

      return (
        <Col>
          { () => getItem() }
        </Col>
      );
    };
  },
});

export default FormItem;
