<script lang="ts">
  import {
    defineComponent, onMounted, reactive, Ref, ref, watch,
  } from 'vue';
  import { DataBoardAPI } from '@/api/data-board-api';
  import { PassengerFlowAPI } from '@/api/passenger-flow-api';
  import { LotCompositeAPI } from '@/api/lot-composite-api';
  import { downloadFile, getGlobalData } from '@/utils';
  import ChartOptions from '@c/ChartOptions/index.vue';
  import MOMCompare from './components/MOMCompare.vue';
  import CardTitle from './components/CardTitle.vue';
  import TrendLineChart from './components/TrendLineChart.vue';
  import IndexBarChart from './components/IndexBarChart.vue';
  import IndexRadarChart from './components/IndexRadarChart.vue';

  const businessTrendOptions = [
    { label: '商业综合指数', key: 0 },
    { label: '客流指数', key: 1 },
    { label: '忠诚指数', key: 2, tip: '表示顾客对该车场的忠诚度，顾客来的频次越高，离上次到店间隔越短，该指数越高' },
    { label: '客户转化指数', key: 3, tip: '对顾客生命周期变化进行分析，越多顾客转化成活跃顾客，越少顾客转化成流失顾客，该指数越高' },
  ];

  const businessIndexOptions = [
    { label: '上月', key: 0 },
    { label: '近半年', key: 1 },
    { label: '近一年', key: 2 },
  ];

  const trafficIndexOptions = [
    { label: '昨日', key: 0 },
    { label: '七天', key: 1 },
    { label: '近一月', key: 2 },
  ];

  const DataCenter = defineComponent({
    components: {
      MOMCompare,
      CardTitle,
      TrendLineChart,
      ChartOptions,
      IndexBarChart,
      IndexRadarChart,
    },
    setup() {
      const cityId = getGlobalData('cityId') as string;
      const lotId = getGlobalData('lotId') as string;

      // 商业综合指数
      const businessMOM: Ref<KtApi.CompositeIndexDto> = ref({
        avgSynthesizeIndex: 0,
        avgSynthesizeIndexRatio: 0,
        lotNum: 0,
        rank: 0,
        rankRatio: 0,
        synthesizeIndex: 0,
        synthesizeIndexRatio: 0,
      });

      // 车流综合指数
      const trafficMOM: Ref<KtApi.VehicleFlowIndexDto> = ref({
        avgVehicleFlowIndex: 0,
        avgVehicleFlowRatio: 0,
        lotNum: 0,
        rank: 0,
        rankRatio: 0,
        vehicleFlowIndex: 0,
        vehicleFlowIndexRatio: 0,
      });

      // 雷达图
      const businessRadar: Ref<KtApi.CompositeIndexRadarDto[]> = ref([]);

      // 商业指标趋势
      const businessTrend = reactive({
        trendData: [] as KtApi.AjaxResultListSynthesizeIndexDto,
        currentOption: 0,
        currentTrendData: [] as KtApi.DimensionDto[],
        color: ['#826AF9', '#D0AEFF'],
        colorStops: ['rgba(108, 79, 255, 0.24)', 'rgba(108, 79, 255, 0)'],
        export: () => {
          downloadFile('/data-board/exportIndexTendency', {
            cityId: cityId,
            lotId: lotId,
          });
        },
      });
      // 修改商业指标趋势选项
      watch(() => [businessTrend.currentOption, businessTrend.trendData], () => {
        businessTrend.currentTrendData = businessTrend.trendData[businessTrend.currentOption].dimensionDto!;
      });

      // 车流指数趋势
      const trafficTrend = reactive({
        currentTrendData: [] as KtApi.PassengerFlowDimensionDto[],
        color: ['#0B7FED', '#5FDEFF'],
        colorStops: ['rgba(11, 127, 237, 0.24)', 'rgba(11, 127, 237, 0)'],
        export: () => {
          downloadFile('/passenger-flow/exportIndexTendency', {
            cityId: cityId,
            lotId: lotId,
          });
        },
      });

      // 商业综合指数top 10
      const businessIndex = reactive({
        indexData: [] as KtApi.AjaxResultListSynthesizeDimensionTopDto,
        currentOption: 0,
        currentIndexData: [] as KtApi.SynthesizeIndexTopDto[],
        color: ['#826AF9', '#D0AEFF'],
      });
      // 修改商业综合指数top 10时间选项
      watch(() => [businessIndex.currentOption, businessIndex.indexData], () => {
        businessIndex.currentIndexData = businessIndex.indexData[businessIndex.currentOption].passengerFlowDimensionDto!;
      });

      // 车流指数 top 10
      const trafficIndex = reactive({
        indexData: [] as KtApi.AjaxResultListPassengerFlowIndexTopDto,
        currentOption: 0,
        currentIndexData: [] as KtApi.VehicleFlowIndexTopDto[],
        color: ['#0B7FED', '#5FDEFF'],
      });
      // 修改车流指数top 10时间选项
      watch(() => [trafficIndex.currentOption, trafficIndex.indexData], () => {
        trafficIndex.currentIndexData = trafficIndex.indexData[trafficIndex.currentOption].passengerFlowDimensionDto!;
      });

      onMounted(async () => {
        // 商业趋势
        DataBoardAPI.getIndexTendencyUsingGET(cityId, lotId)
          .then(res => {
            businessTrend.trendData = res;
          });

        // 车流趋势
        PassengerFlowAPI.getIndexTendencyUsingGET(cityId, lotId)
          .then(res => {
            trafficTrend.currentTrendData = res.passengerFlowDimensionDto!;
          });

        // 商业指数top10
        LotCompositeAPI.getLotCompositeAndPassengerFlowIndexUsingGET()
          .then(res => {
            businessIndex.indexData = res;
          });

        // 车流指数top10
        PassengerFlowAPI.getLotCompositeAndPassengerFlowIndexUsingGET()
          .then(res => {
            trafficIndex.indexData = res;
          });

        // 商业车流综合指数
        DataBoardAPI.getLotCompositeAndPassengerFlowIndexUsingGET(cityId, lotId)
          .then(res => {
            businessMOM.value = res.compositeIndexDto!;
            trafficMOM.value = res.vehicleFlowIndexDto!;
            businessRadar.value = res.radarDto!;
          });
      });

      return {
        businessMOM,
        trafficMOM,
        businessRadar,
        businessTrend,
        trafficTrend,
        businessIndex,
        trafficIndex,
        businessTrendOptions,
        businessIndexOptions,
        trafficIndexOptions,
      };
    },
  });

  export default DataCenter;
</script>

<template>
  <div class="grid grid-cols-2 gap-8">
    <!-- 指数环比 -->
    <div class="data-center-card">
      <card-title title="商业综合指数" tip="通过对商场客流量，顾客忠诚程度，流失转化情况等指标进行综合评价，得到商业的运行的综合指数，该指数越大代表该商场运 行综合质量越好。" />
      <m-o-m-compare
        title="上月本商场综合指数"
        :number="businessMOM.synthesizeIndex"
        :compare="businessMOM.synthesizeIndexRatio"
      />
      <m-o-m-compare
        title="城市排名"
        :number="businessMOM.rank"
        :compare="businessMOM.rankRatio"
      >
        <template #title-tip>
          共{{ businessMOM.lotNum }}个车场
        </template>
      </m-o-m-compare>
      <m-o-m-compare
        title="本市平均指数"
        :number="businessMOM.avgSynthesizeIndex"
        :compare="businessMOM.avgSynthesizeIndexRatio"
      />
      <index-radar-chart :radar-data="businessRadar" />
    </div>
    <div class="data-center-card">
      <card-title title="车流指数" tip="每天对本市所有商场车流进行综合评价，获得每个车场的相对车流情况，车流指数越大，表示该车场车流量越大。" />
      <m-o-m-compare
        title="昨日本商场车流指数"
        :number="trafficMOM.vehicleFlowIndex"
        :compare="trafficMOM.vehicleFlowIndexRatio"
      />
      <m-o-m-compare
        title="城市排名"
        :number="trafficMOM.rank"
        :compare="trafficMOM.rankRatio"
      >
        <template #title-tip>
          共{{ trafficMOM.lotNum }}个车场
        </template>
      </m-o-m-compare>
      <m-o-m-compare
        title="本市平均指数"
        :number="trafficMOM.avgVehicleFlowIndex"
        :compare="trafficMOM.avgVehicleFlowRatio"
      />
    </div>

    <!-- 趋势图 -->
    <div class="data-center-card">
      <card-title title="商业指标趋势" />
      <chart-options
        v-model:current="businessTrend.currentOption"
        :options="businessTrendOptions"
        class="card-chart-options"
      />
      <a-button class="absolute top-3 right-4 z-10 kt-btn-1" @click="businessTrend.export">
        导出
      </a-button>
      <trend-line-chart
        :business-trend-data="businessTrend.currentTrendData"
        :color="businessTrend.color"
        :color-stops="businessTrend.colorStops"
      />
    </div>
    <div class="data-center-card">
      <card-title title="车流指数趋势" />
      <a-button class="absolute top-3 right-4 z-10 kt-btn-1" @click="trafficTrend.export()">
        导出
      </a-button>
      <trend-line-chart
        :traffic-trend-data="trafficTrend.currentTrendData"
        :color="trafficTrend.color"
        :color-stops="trafficTrend.colorStops"
      />
    </div>

    <!-- 指数图 -->
    <div class="data-center-card">
      <card-title title="商业综合指数Top10" />
      <chart-options
        v-model:current="businessIndex.currentOption"
        :options="businessIndexOptions"
        class="card-chart-options"
        style="right: 16px;"
      />
      <index-bar-chart
        lot-id="4900"
        :business-index-data="businessIndex.currentIndexData"
        :color="businessIndex.color"
      />
    </div>
    <div class="data-center-card">
      <card-title title="车流指数Top10" />
      <chart-options
        v-model:current="trafficIndex.currentOption"
        :options="trafficIndexOptions"
        class="card-chart-options"
        style="right: 16px;"
      />
      <index-bar-chart
        lot-id="4900"
        :traffic-index-data="trafficIndex.currentIndexData"
        :color="trafficIndex.color"
      />
    </div>
  </div>
</template>

<style>
.data-center-card {
  @apply flex justify-around items-center relative p-4 bg-white rounded-md;
}

.card-chart-options {
  @apply absolute top-3 z-10;
}
</style>
