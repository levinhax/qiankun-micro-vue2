<template>
  <div class="page-table-wrapper">
    <h3>Pagination 分页</h3>

    <div class="table-container">
      <a-table :loading="loading" :columns="columns" :data-source="tableData" :pagination="false" />
      <ComPage
        :propTotalNumber="pageTotal"
        :propPageIndex="data_PageIndex"
        :propPageSize="data_PageSize"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import ComPage from '../../components/custom-page/index.vue';

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
for (let i = 0; i < 20; i++) {
  allData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  name: 'PageTablePage',
  components: {
    ComPage,
  },
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
      pageTotal: 100,
      data_PageIndex: 1,
      data_PageSize: 10,
    };
  },
  created() {
    this.getTableData(this.data_PageIndex, this.data_PageSize);
  },
  methods: {
    async getTableData() {
      console.log('page size: ', this.data_PageIndex, this.data_PageSize);
      this.loading = true;
      setTimeout(() => {
        this.tableData = allData;
        this.loading = false;
      }, 200);
    },
    handlePageChange({ pageIndex, pageSize }) {
      console.log('handlePageChange: ', pageIndex, pageSize);
      this.data_PageIndex = pageIndex;
      this.data_PageSize = pageSize;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-table-wrapper {
  h3 {
    text-align: center;
    line-height: 60px;
  }

  .table-container {
    margin: 0px 16px 0;
  }
}
</style>
