<template>
  <div class="scroll-table-wrapper">
    <h3>滚动懒加载</h3>

    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :scroll="{ y: 280 }"
      v-tableLoadMore="tableLoadMore"
    />
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const allData = [];
for (let i = 0; i < 100; i++) {
  allData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  name: 'ScrollTablePage',
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
      total: 100,
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.getTableData(this.page, this.limit);
  },
  methods: {
    async getTableData(page, limit) {
      this.loading = true;
      setTimeout(() => {
        const res = allData.slice((page - 1) * limit, page * limit);
        this.tableData.push(...res);
        this.loading = false;
      }, 200);
    },
    tableLoadMore(val) {
      if (val.direction === 'down' && val.distanceRelativeToBottom <= 0) {
        if (this.page < Math.ceil(this.total / this.limit)) {
          this.page++;
          this.getTableData(this.page, this.limit);
        }
      }

      if (val.direction === 'up' && val.scrollTop === 0) {
        this.page = 1;
        this.tableData = [];
        this.getTableData(this.page, this.limit);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-table-wrapper {
  h3 {
    text-align: center;
    line-height: 60px;
  }
}
</style>
