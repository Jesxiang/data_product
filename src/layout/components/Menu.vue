<script lang="ts">
  import {
    defineComponent,
  } from 'vue';
  import SubMenu from './SubMenu.vue';
  import { Menus } from '@/router';

  const Menu = defineComponent({
    components: {
      SubMenu,
    },
    setup() {
      return {
        Menus,
      };
    },
  });

  export default Menu;
</script>

<template>
  <div class="px-6 bg-white container">
    <sub-menu
      v-for="(menu) of Menus"
      :key="menu.name"
      :menu="menu"
    />
  </div>
</template>
