<script lang="ts">
  import { defineComponent } from 'vue';

  const RegionHeader = defineComponent({
    props: {
      title: {
        required: true,
        type: String,
      },
      border: {
        type: Boolean,
        default: () => true,
      },
    },
  });

  export default RegionHeader;
</script>

<template>
  <div class="region-header" :style="border && { 'border-bottom': '1px solid var(--mainColor4)' }">
    <div class="title">
      {{ title }}
    </div>
    <slot name="handle" />
  </div>
</template>

<style lang="less">
  .region-header {
    .wh(100%, 54px);

    position: relative;
    background: #fff;

    .title {
      .fSizeColor(var(--bigFontSize), var(--fontColor1));

      position: absolute;
      top: 16px;
      left: 16px;
      font-weight: 600;
    }

    .handle {
      position: absolute;
      right: 16px;
      height: 100%;
      line-height: 54px;
    }
  }
</style>
