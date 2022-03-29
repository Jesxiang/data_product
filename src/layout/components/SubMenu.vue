<script lang="ts">
  import {
    computed, defineComponent, PropType, ref, watch,
  } from 'vue';
  import { MenuType } from '../types';
  import { useRoute, useRouter } from 'vue-router';
  import MenuItem from './MenuItem.vue';

  const SubMenu = defineComponent({
    components: { MenuItem },
    props: {
      menu: {
        type: Object as PropType<MenuType>,
        required: true,
      },
    },
    setup(props) {
      const route = useRoute();
      // 当前目录是否选中
      const isSelected = computed(() => {
        const menuNames: string[] = [];
        route.matched.forEach(_ => {
          menuNames.push((_.name || _.redirect) as string);
        });
        return menuNames.includes(props.menu.name);
      });

      const isOpenMenu = ref(false);

      const router = useRouter();
      const handleMenuSelect = () => {
        if (props.menu.subMenu.length) {
          isOpenMenu.value = !isOpenMenu.value;
        } else {
          router.push({ name: props.menu.name });
        }
      };

      // 当前目录是否打开
      watch(() => route.matched, () => {
        const openMenus = props.menu.subMenu.map(_ => _.name);
        route.matched.forEach(_ => {
          if (openMenus.includes(_.name as string)) {
            isOpenMenu.value = true;
          }
        });
      }, {
        immediate: true,
      });

      return {
        isSelected,
        isOpenMenu,
        handleMenuSelect,
      };
    },
  });

  export default SubMenu;
</script>

<template>
  <div
    class="w-full h-56px text-font-3 px-6 mb-3 text-base cursor-pointer relative"
    :class="isSelected && 'kt-bg'"
    style="line-height: 56px;"
    @click="handleMenuSelect"
  >
    <img
      class="pr-4"
      :src="require(`@/assets/images/${isSelected ? menu.selectImg : menu.img}.png`)"
      alt=""
    >
    {{ menu.title }}
    <template v-if="menu.subMenu.length">
      <img
        class="absolute right-3 top-3"
        :src="require(`@/assets/images/${isOpenMenu ? 'arrow-up' : 'arrow-down'}.png`)"
        alt=""
      >
      <transition
        type="transition"
        enter-active-class="duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-1"
        leave-active-class="duration-500 ease-in"
        leave-from-class="opacity-1"
        leave-to-class="opacity-0"
      >
        <menu-item v-if="isOpenMenu" :sub-menu="menu.subMenu" />
      </transition>
    </template>
  </div>
</template>
