<template>
  <div class="db-distribution-wrapper">
    <h3 class="title">数据库类型分布</h3>
    <Banner />
  </div>
</template>

<script>
import Banner from '../components/banner';

export default {
  name: 'DbDistribution',
  components: {
    Banner,
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
.db-distribution-wrapper {
  width: 960px;
  margin: 0 auto;
}
</style>
