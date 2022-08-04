<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);
import { COLORS } from '../publicConfig.js';

export default {
  name: 'BarByYChart',
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
        // title: {
        //   text: 'World Population',
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          right: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        color: ['#2062FF', '#0ACCEC'],
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.03],
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            // width: 50,
            // overflow: 'break',
            margin: 32,
            align: 'center',
            fontFamily: 'PingFangSC-Regular',
            fontSize: '12px',
            color: '#606061',

            formatter: function (params) {
              var newParamsName = '';
              var paramsNameNumber = params.length;
              var provideNumber = 5; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                //两行展示
                for (var p = 0; p < 2; p++) {
                  var tempStr = '';
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + '\n';
                  }
                  newParamsName += tempStr;
                }
                // 换行时....
                if (newParamsName.length > 10) {
                  newParamsName = newParamsName.substring(0, newParamsName.length - 2) + '...' + '';
                }
              } else {
                newParamsName = params;
              }
              // 调取生成浮窗的函数
              // this.extension(that.chart)
              return newParamsName;
            },
          },
          nameTextStyle: {
            align: 'center',
            verticalAlign: 'middle',
          },
          data: [
            '县政务数据办',
            '县文化旅游体育局体育局体育局',
            '县农业农村局',
            '县民政局',
            '嘉善县交投集团',
            '县交通局',
          ],
        },
        series: [
          {
            name: '命中规则数',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(242,244,248,1)',
            },
            label: {
              show: true,
              position: 'right',
              fontSize: 8,
              valueAnimation: true,
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            barWidth: 12,
          },
          {
            name: '命中规则的字段总数',
            type: 'bar',
            showBackground: true,
            label: {
              show: true,
              position: 'right',
              fontSize: 8,
              valueAnimation: true,
            },
            backgroundStyle: {
              color: 'rgba(242,244,248,1)',
            },
            data: [19325, 23438, 31000, 121594, 134141, 681807],
            barWidth: 12,
          },
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
