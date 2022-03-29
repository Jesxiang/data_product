<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { MenuType } from '../types';
  import { useRouter } from 'vue-router';

  const MenuItem = defineComponent({
    props: {
      subMenu: {
        type: Object as PropType<MenuType[]>,
        required: true,
      },
    },
    setup() {
      const router = useRouter();
      const go = (name: string) => {
        router.push({ name: name });
      };

      return {
        go,
      };
    },
  });

  export default MenuItem;
</script>

<template>
  <div>
    <div
      v-for="item of subMenu"
      :key="item.name"
      :class="$route.name === item.name ? 'text-main-1' : 'text-font-3'"
      style="margin-left: 40px;"
      @click.stop="() => go(item.name)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style>
</style>
