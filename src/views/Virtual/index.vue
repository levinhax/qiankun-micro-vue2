<template>
  <div class="virtual-wrapper">
    <h1>虚拟列表(固定高度)</h1>

    <div class="list-content">
      <VirtualList :listData="data" :itemSize="100" />
    </div>
  </div>
</template>

<script>
import VirtualList from '@/components/VirtualList';

export default {
  name: 'Virtual',
  components: {
    VirtualList,
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.setListData();
  },
  methods: {
    setListData() {
      let d = [];
      for (let i = 0; i < 10000; i++) {
        d.push({ id: i, value: i });
      }
      this.data = d;
    },
  },
};
</script>

<style>
.list-content {
  width: 400px;
  height: 600px;
}
</style>
