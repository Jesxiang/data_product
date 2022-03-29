<script lang="ts">
  import {
    defineComponent, PropType, ref, watchEffect,
  } from 'vue';

  const TrendLineChart = defineComponent({
    props: {
      businessTrendData: {
        type: Array as PropType<KtApi.DimensionDto[]>,
        default: () => [],
      },
      trafficTrendData: {
        type: Array as PropType<KtApi.PassengerFlowDimensionDto[]>,
        default: () => [],
      },
      color: {
        type: Array,
        default: () => [],
      },
      colorStops: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const option: any = ref({
        color: props.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter(params) {
            let tooltip = `<span style="color: #A8AFB4">${params[0].axisValue}</span><br/>`;
            params.forEach(item => {
              tooltip = `${tooltip}<span style="width: 100px; display: inline-block">${item.marker}${item.seriesName}</span>
                          ${item.value}<br/>`;
            });
            return tooltip;
          },
        },
        legend: {
          data: ['本商场', '本市平均值'],
          bottom: 5,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
        },
        grid: {
          left: 30,
          right: 40,
          bottom: 40,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
          minInterval: 10,
        },
        series: [
          {
            name: '本商场',
            type: 'line',
            data: [],
            smooth: 0.3,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: props.colorStops[0], // 0%处的颜色
                  }, {
                    offset: 1,
                    color: props.colorStops[1], // 100%处的颜色
                  }],
                },
              },
            },
          },
          {
            name: '本市平均值',
            type: 'line',
            data: [],
            smooth: 0.3,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: props.colorStops[0], // 0%处的颜色
                  }, {
                    offset: 1,
                    color: props.colorStops[1], // 100%处的颜色
                  }],
                },
              },
            },
          },
        ],
      });

      watchEffect(() => {
        const trafficTrendData = props.trafficTrendData;
        const businessTrendData = props.businessTrendData;
        if (businessTrendData && businessTrendData.length) {
          // x轴 时间轴
          option.value.xAxis.data = businessTrendData[0].synthesizeIndexDimensionDto!.map(item => item.month);
          // 折线图数据
          // 本商场
          option.value.series[0].data = businessTrendData[0].synthesizeIndexDimensionDto!.map(item => item.avg);
          // 本市
          option.value.series[1].data = businessTrendData[1].synthesizeIndexDimensionDto!.map(item => item.avg);
          setYAxisMinValue(businessTrendData[0].synthesizeIndexDimensionDto!.map(item => item.avg),
                           businessTrendData[1].synthesizeIndexDimensionDto!.map(item => item.avg));
        }

        if (trafficTrendData && trafficTrendData.length) {
          // x轴 时间轴
          option.value.xAxis.data = trafficTrendData[0].vehicleFlowIndexTendencyDto!.map(item => item.day);
          // 折线图数据
          // 本商场
          option.value.series[0].data = trafficTrendData[0].vehicleFlowIndexTendencyDto!.map(item => item.carFlowIndex);
          // 本市
          option.value.series[1].data = trafficTrendData[1].vehicleFlowIndexTendencyDto!.map(item => item.carFlowIndex);
          setYAxisMinValue(trafficTrendData[0].vehicleFlowIndexTendencyDto!.map(item => item.carFlowIndex),
                           trafficTrendData[1].vehicleFlowIndexTendencyDto!.map(item => item.carFlowIndex));
        }
      });

      // 设置y轴的最小值
      const setYAxisMinValue = (v1s: number[], v2s: number[]) => {
        const v1 = v1s.sort()[0];
        const v2 = v2s.sort()[0];
        const min = v1 > v2 ? v2 : v1;
        // 最小值-20 并向下取10的倍数
        option.value.yAxis.min = Math.floor((min - 20) / 10) * 10;
      };

      return {
        option,
      };
    },
  });

  export default TrendLineChart;
</script>

<template>
  <v-chart
    :option="option"
    autoresize
    class="trend-line-chart"
  />
</template>

<style lang="less" scoped>
.trend-line-chart {
  height: 270px;
}
</style>
