<template>
  <div class="chart-wrapper assets-top8-wrapper">
    <h3 class="title">敏感数据资产表(TOP8)</h3>
    <div class="chart-container">
      <AssetsTop8 :propData="chartData" />
    </div>
    <div class="btn-container">
      <a-button type="primary" @click="updateData">更新数据</a-button>
    </div>
  </div>
</template>

<script>
import AssetsTop8 from '../components/assets-top8';

export default {
  name: 'AssetsTop8View',
  components: {
    AssetsTop8,
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
