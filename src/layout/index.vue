<script lang="ts">
  import {
    defineComponent, watch, computed, ref,
  } from 'vue';
  import { useRoute, useRouter, RouteLocationMatched } from 'vue-router';
  import Menu from './components/Menu.vue';

  const Lay = defineComponent({
    components: {
      'kt-menu': Menu,
    },
    setup() {
      const route = useRoute();
      const key = computed(() => route.path);
      const router = useRouter();
      function breadcrumbRedirect(routeMatched: RouteLocationMatched) {
        router.replace({ name: routeMatched.name });
      }

      const breadcrumbs = ref<RouteLocationMatched[]>([]);

      watch(() => route.matched, () => {
        breadcrumbs.value = [];
        setBreadcrumb(route.matched);
      }, {
        immediate: true,
      });

      function setBreadcrumb(routes: RouteLocationMatched[]) {
        routes.forEach(value => {
          if (value.meta.breadcrumb && !breadcrumbs.value.includes(value)) {
            breadcrumbs.value.push(value);
          }
        });
      }

      return {
        key,
        breadcrumbs,
        breadcrumbRedirect,
      };
    },
  });

  export default Lay;
</script>

<template>
  <a-layout class="lay">
    <a-layout-sider
      width="316"
      theme="light"
      class="lay-sider"
    >
      <div class="lay-sider-header">
        <img
          style="width: 40px; margin-left: 30px;"
          src="@/assets/images/logo.png"
          alt=""
        >
        <span>
          商业大数据查询平台
        </span>
      </div>
      <kt-menu />
      <img
        src="@/assets/images/sider-bottom.png"
        alt=""
        style="position: absolute; bottom: 24px;"
      >
    </a-layout-sider>
    <a-layout class="lay-container">
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="(breadcrumb, index) of breadcrumbs"
          :key="index"
          :style="{ cursor: index < breadcrumbs.length - 1 ? 'pointer' : '' }"
          @click="breadcrumbRedirect(breadcrumb)"
        >
          {{ breadcrumb.meta.name }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="key" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
.lay {
  min-height: 100vh;

  &-sider {
    .ant-layout-sider-children {
      .flexDisplay(flex-start, center, column);
    }

    &-header {
      .wh(100%, 100px);
      .fSizeColor(20px, var(--fontColor1));
      .flexDisplay(flex-start, center);

      font-weight: 600;

      > span {
        margin-bottom: 5px;
        margin-left: 10px;
      }
    }
  }

  &-container {
    background: var(--bgColor3);

    .content {
      height: calc(100vh - 55px);
      padding: 0 24px 24px;

      > div {
        height: 100%;
      }
    }
  }

  .ant-breadcrumb {
    height: 55px;
    padding: 0 24px;
    line-height: 55px;
  }
}
</style>
