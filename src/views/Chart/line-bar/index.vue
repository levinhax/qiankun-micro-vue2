<template>
  <div class="chart-wrapper line-chart-wrapper">
    <h3 class="title">未来一周气温变化(折线图)</h3>
    <div class="chart-container">
      <LineChart :propData="chartData" />
    </div>
    <div class="btn-container">
      <a-button type="primary" @click="updateData">更新数据</a-button>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/line-bar';

export default {
  name: 'LineBarView',
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        y1: [10, 11, 13, 11, 12, 12, 9],
        y2: [1, -2, 2, 5, 3, 2, 0],
      },
    };
  },
  methods: {
    updateData() {
      this.chartData = {
        y1: [10, 11, 15, 16, 12, 12, 9],
        y2: [1, -2, 2, 5, 6, 2, 0],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../chart.scss';
</style>
