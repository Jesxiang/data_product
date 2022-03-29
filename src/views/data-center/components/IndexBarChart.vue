<script lang="ts">
  import {
    defineComponent, PropType, ref, watchEffect,
  } from 'vue';

  const IndexBarChart = defineComponent({
    props: {
      lotId: {
        type: String,
        required: true,
      },
      businessIndexData: {
        type: Array as PropType<KtApi.SynthesizeIndexTopDto[]>,
        default: () => [],
      },
      trafficIndexData: {
        type: Array as PropType<KtApi.VehicleFlowIndexTopDto[]>,
        default: () => [],
      },
      color: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {

      const option: any = ref({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(params) {
            let tooltip = `<span style="color: #A8AFB4">${params[0].axisValue}</span><br/>`;
            params.forEach(item => {
              tooltip = `${tooltip}<span>${item.marker}</span>
                          ${item.value}<br/>`;
            });
            return tooltip;
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: [],
          axisTick: false,
        },
        series: [
          {
            type: 'bar',
            data: [],
            barWidth: 8,
            itemStyle: {
              borderRadius: [0, 100, 100, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: props.color[0], // 0%处的颜色
                }, {
                  offset: 1,
                  color: props.color[1], // 100%处的颜色
                }],
              },
            },
          },
        ],
      });

      watchEffect(() => {
        const businessIndexData = props.businessIndexData;
        const trafficIndexData = props.trafficIndexData;

        // 商业综合指数
        if (businessIndexData && businessIndexData.length) {
          option.value.yAxis.data = businessIndexData.map(item => {
            if (item.lotId === props.lotId) {
              return {
                value: item.lotName,
                textStyle: {
                  color: props.color[0],
                },
              };
            }
            return item.lotName;
          });
          // 柱状图数据
          if (option.value.series) {
            option.value.series[0].data = businessIndexData.map(item => item.synthesizeIndex);
          }
        }

        // 车流指数
        if (trafficIndexData && trafficIndexData.length) {
          option.value.yAxis.data = trafficIndexData.map(item => {
            if (item.lotId === props.lotId) {
              return {
                value: item.lotName,
                textStyle: {
                  color: props.color[0],
                },
              };
            }
            return item.lotName;
          });
          // 柱状图数据
          if (option.value.series) {
            option.value.series[0].data = trafficIndexData.map(item => item.carFlowIndex);
          }
        }
      });

      return {
        option,
      };
    },
  });

  export default IndexBarChart;
</script>

<template>
  <v-chart
    :option="option"
    autoresize
    class="index-bar-chart"
  />
</template>

<style lang="less" scoped>
.index-bar-chart {
  height: 280px;
}
</style>
