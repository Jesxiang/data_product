<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';

  const MOMCompare = defineComponent({
    props: {
      title: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      compare: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const compareValue = ref('up');

      watch(() => props.compare, () => {
        if (props.compare && props.compare.toString().includes('-')) {
          compareValue.value = 'down';
        }
      }, {
        immediate: true,
      });

      return {
        compareValue,
      };
    },
  });

  export default MOMCompare;
</script>

<template>
  <div class="flex flex-col justify-between items-center h-100px">
    <div class="text-base">
      {{ title }}
      <span class="text-font-2">
        <slot name="title-tip" />
      </span>
    </div>
    <div class="text-2xl">
      {{ `${number}${title === '城市排名' ? '名' : ''}` }}
    </div>
    <div>
      环比
      <img
        :src="require(`@/assets/images/compare-${compareValue}.png`)"
        alt=""
        style="margin: 0 4px;"
      >
      <span :class="compareValue === 'up' ? 'text-main-3' : 'text-main-2'">
        {{ `${compare}${title === '城市排名' ? '名' : '%'}` }}
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mom-compare {
  .flexDisplay(space-between, center, column);

  height: 100px;

  .title {
    font-size: var(--bigFontSize);
  }

  .number {
    font-size: 24px;
    font-weight: 600;
  }

  .compare-up {
    color: var(--upColor);
  }

  .compare-down {
    color: var(--downColor);
  }
}
</style>
