<script lang="ts">
  import { defineComponent } from 'vue';

  const CardTitle = defineComponent({
    props: {
      title: {
        type: String,
        required: true,
      },
      tip: {
        type: String,
        default: '',
      },
    },
    setup() {

    },
  });

  export default CardTitle;
</script>

<template>
  <div class="absolute top-3 left-5 text-font-1 text-base font-bold">
    {{ title }}
    <a-tooltip
      v-if="tip"
      :title="tip"
      placement="right"
    >
      <img
        src="@/assets/images/help-icon.png"
        alt=""
      >
    </a-tooltip>
  </div>
</template>
