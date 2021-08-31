<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  // ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  // ToolboxComponent,
  LineChart,
  CanvasRenderer,
]);
import { COLORS } from '../publicConfig.js';

export default {
  name: 'LineBar',
  data() {
    return {
      myChart: undefined,
    };
  },
  props: {
    propData: {
      type: Object,
      default() {
        return {};
      },
    },
    propColors: {
      type: Array,
      default() {
        return COLORS;
      },
    },
  },
  watch: {
    propData() {
      this.$nextTick(() => {
        this.drawChart();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
      window.addEventListener('resize', () => {
        this.handleResize();
      });
    });
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    drawChart() {
      const { y1, y2 } = this.propData;
      if (!y1 || !y1.length || !y2 || !y2.length) return false;
      this.myChart = echarts.init(this.$refs.chart);

      const option = {
        title: {
          text: '未来一周气温变化',
          subtext: '纯属虚构',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: true,
          data: ['最高气温', '最低气温'],
          right: 60,
          top: 8,
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none',
        //     },
        //     dataView: { readOnly: false },
        //     magicType: { type: ['line', 'bar'] },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C',
          },
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: y1,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: '最低气温',
            type: 'line',
            data: y2,
            markPoint: {
              data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max',
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值',
                    },
                    type: 'max',
                    name: '最高点',
                  },
                ],
              ],
            },
          },
          // blendMode: 'luminosity' // 柱状图重合的颜色，blendMode 混合模式
        ],
      };

      this.$nextTick(() => {
        this.myChart.setOption(option);
      });
    },
    handleResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  // flex: 1;
}
</style>
