<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  const ChartOptions = defineComponent({
    props: {
      options: {
        type: Array as PropType<Array<{ label: string, key: string | number, tip?: string }>>,
        default: () => [],
      },
      current: {
        type: [Number, String],
        required: true,
      },
    },
    emits: ['update:current'],
    setup(props, { emit }) {

      const handleOptionSelect = (key: string) => {
        emit('update:current', key);
      };

      return {
        handleOptionSelect,
      };
    },
  });

  export default ChartOptions;
</script>

<template>
  <div class="flex rounded-lg border border-color-3">
    <div
      v-for="option of options"
      :key="option.key"
      class="flex justify-center items-center w-104px h-32px text-font-2 text-xs cursor-pointer"
      :class="option.key === current && 'option-selected'"
      @click="() => handleOptionSelect(option.key)"
    >
      {{ option.label }}
      <a-tooltip
        v-if="option.tip"
        :title="option.tip"
        placement="right"
      >
        <img src="@/assets/images/help-icon.png" alt="">
      </a-tooltip>
    </div>
  </div>
</template>

<style>
.option-selected {
  @apply bg-main-4 text-main-1 font-semibold;
}
</style>
