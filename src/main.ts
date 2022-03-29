import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import 'nprogress/nprogress.css'; // nprogress
import 'ant-design-vue/dist/antd.css'; // 全局antd样式
import './styles/index.less';
import './styles/tailwind.css';

import ECharts from 'vue-echarts'; // v-chars

import { registerCharts } from '@/utils/register-charts';
import { registerAntd } from '@/utils/register-antd';

import { getApp } from '@/utils';

const app = getApp(App);

// 注册需要使用的echarts
registerCharts();

// 注册需要使用的antd 组件
registerAntd(app);

app.config.globalProperties.cityId = '116';
app.config.globalProperties.lotId = '4900';

app.component('VChart', ECharts);

app.use(store).use(router).mount('#app');
