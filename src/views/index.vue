<script lang="ts">
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import Lay from '@/layout/index.vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

const Index = defineComponent({
  components: {
    ConfigProvider,
    Lay,
  },
  setup() {
    // 设置主题样式
    document.querySelector('html')!.dataset.theme = 'theme1';

    moment.locale('zh-cn');

    const locale = zhCN;

    return {
      locale,
    };
  },
});

export default Index;
</script>

<template>
  <config-provider :locale="locale">
    <lay />
  </config-provider>
</template>
