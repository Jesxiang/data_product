<script lang="ts">
  import {
    defineComponent, PropType, ref, watchEffect,
  } from 'vue';

  const IndexRadarChart = defineComponent({
    props: {
      radarData: {
        type: Array as PropType<KtApi.CompositeIndexRadarDto[]>,
        required: true,
      },
    },
    setup(props) {
      const option: any = ref({
        color: ['#826AF9', '#2CD9C5'],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          data: ['本市平均值', '本商场'],
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
        },
        radar: {
          name: {
            color: '#000000',
            fontSize: 10,
          },
          indicator: [
            { name: '客户转化指数' },
            { name: '忠诚指数' },
            { name: '客流指数' },
          ],
          nameGap: 3,
        },
        series: [{
          type: 'radar',
          tooltip: {
            show: true,
            borderColor: '#fff',
            formatter(params) {
              const { data, marker } = params;
              let tooltip = `<span style="color: #A8AFB4">${data.name}</span><br/>`;
              data.value.forEach((item, index) => {
                tooltip = `${tooltip}<span style="width: 120px; display: inline-block">${marker}
                            ${option.value.radar.indicator[index].name}：</span>${item}<br/>`;
              });
              return tooltip;
            },
            textStyle: {
              fontSize: 12,
            },
          },
          data: [
            {
              value: [],
              name: '本市平均值',
            },
            {
              value: [],
              name: '本商场',
            },
          ],
        }],
      });

      watchEffect(() => {
        const radarData = props.radarData;
        if (radarData.length) {
          // 倒序从客户转化指数开始放入数据
          // 平均值
          option.value.series[0].data[0].value = radarData.reverse().map(item => item.avg);
          // 车场值
          option.value.series[0].data[1].value = radarData.reverse().map(item => item.lotValue);
        }
      });

      return {
        option,
      };
    },
  });

  export default IndexRadarChart;
</script>

<template>
  <v-chart
    :option="option"
    autoresize
    class="index-radar-chart"
  />
</template>

<style lang="less" scoped>
.index-radar-chart {
  .wh(230px, 218px);
}
</style>
