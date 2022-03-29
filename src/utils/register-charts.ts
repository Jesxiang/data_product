/**
 *  created by lllwx
 *  Date: 2021/6/3
 *  Time: 1:55 下午
 *  Version: 1.0
 *  For: echarts 按需加载
 */
import {
  LineChart, BarChart, RadarChart, TreeChart,
} from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { use } from 'echarts/core';

export const registerCharts = () => {
  use([
    LineChart,
    BarChart,
    RadarChart,
    TreeChart,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
    CanvasRenderer,
  ]);
};
