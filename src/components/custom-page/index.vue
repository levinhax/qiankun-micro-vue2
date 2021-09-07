<template>
  <div class="page-root">
    <a-pagination
      :show-total="total => `共 ${total} 条`"
      show-size-changer
      :total="propTotalNumber"
      :current="propPageIndex"
      :page-size="propPageSize"
      :page-size-options="pageSizeOptions"
      @change="handleChangePageIndex"
      @showSizeChange="handleChangePageSize"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomPage',
  data() {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
    };
  },
  props: {
    // 总条数
    propTotalNumber: {
      type: Number,
      default: 0,
    },
    // 当前页
    propPageIndex: {
      type: Number,
      default: 1,
    },
    // 每页条数
    propPageSize: {
      type: Number,
      default: 20,
    },
  },
  watch: {
    propPageIndex(newVal) {
      this.local_PageIndex = newVal;
    },
    propPageSize(newVal) {
      this.local_PageSize = newVal;
    },
  },
  created() {
    // 暂存数据
    this.local_PageIndex = this.propPageIndex;
    this.local_PageSize = this.propPageSize;
  },
  methods: {
    handleChangePageIndex(page) {
      this.local_PageIndex = page;
      this.$emit('change', {
        pageIndex: this.local_PageIndex,
        pageSize: this.local_PageSize,
      });
    },
    handleChangePageSize(current, size) {
      this.local_PageSize = size;
      this.$emit('change', {
        pageIndex: this.local_PageIndex,
        pageSize: this.local_PageSize,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.page-root {
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
