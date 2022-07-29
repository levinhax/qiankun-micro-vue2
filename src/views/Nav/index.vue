<template>
  <div class="nav">
    <h3 class="title">导航</h3>
    <div class="content">
      <a-row type="flex" justify="start" :gutter="16">
        <a-col v-for="(item, index) in local_NavData" :key="index" :span="4">
          <div class="nav-item" @click="handleClick(item)">{{ item.title }}</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { NavData } from './constant';

export default {
  name: 'Home',
  data() {
    return {};
  },
  created() {
    this.local_NavData = NavData;
  },
  methods: {
    handleClick(item) {
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  .title {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 60px;
  }

  .content {
    width: 100%;
    height: calc(100vh - 120px);
    padding: 16px 32px;
    overflow-y: scroll;
  }

  .nav-item {
    height: 44px;
    background: #00a0e9;
    color: #fff;
    font-size: 16px;
    padding: 12px 16px;
    cursor: pointer;
  }
}
</style>
