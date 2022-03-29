/**
 *  created by lllwx
 *  Date: 2021/6/18
 *  Time: 11:51 上午
 *  Version: 1.0
 *  For: 注册需要使用的antd组件
 */
import { App } from 'vue';

import {
  Button,
  Form,
  Upload,
  Row,
  Col,
  Progress,
  Steps,
  Tree,
  TreeSelect,
  Transfer,
  DatePicker,
  Modal,
  Layout,
  Menu,
  Breadcrumb,
  Tooltip,
  Dropdown,
  Input,
  Select,
  Pagination,
  Spin,
  Popconfirm,
  Table,
  Empty,
} from 'ant-design-vue';

export const registerAntd = (app: App) => {
  app
    .use(Layout)
    .use(Button)
    .use(Form)
    .use(Upload)
    .use(Row)
    .use(Col)
    .use(Progress)
    .use(Steps)
    .use(Tree)
    .use(TreeSelect)
    .use(DatePicker)
    .use(Modal)
    .use(Menu)
    .use(Breadcrumb)
    .use(Tooltip)
    .use(Dropdown)
    .use(Transfer)
    .use(Input)
    .use(Select)
    .use(Pagination)
    .use(Popconfirm)
    .use(Table)
    .use(Empty)
    .use(Spin);
};
