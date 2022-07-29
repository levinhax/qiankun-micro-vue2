<template>
  <div class="chart-wrapper assets-top8-wrapper">
    <h3 class="title">敏感数据资产表图表</h3>
    <div class="chart-container">
      <BarByYChart :propData="chartData" />
    </div>
    <div class="btn-container">
      <a-button type="primary" @click="updateData">更新数据</a-button>
    </div>
  </div>
</template>

<script>
import BarByYChart from '../components/bar-y-category';

export default {
  name: 'AssetsTop8View',
  components: {
    BarByYChart,
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
