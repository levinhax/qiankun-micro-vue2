<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="item-content websocket-content">
      <a-button type="primary" @click="showMessage" style="margin-right: 8px">Primary</a-button>
      <a-button>Default</a-button>
    </div>
    <div class="item-content select-content">
      <h4>滚动加载选择器</h4>
      <a-select :value="data_SelectValue" style="width: 240px" @popupScroll="handleSelectMore">
        <a-spin v-if="data_SelectLoading" slot="notFoundContent" size="small" />
        <a-select-option v-for="d in data_SelectOptions" :key="d.key">
          {{ d.label }}
        </a-select-option>
      </a-select>
    </div>
    <div class="item-content router-content">
      <h4>子应用跳转</h4>
      <a-button @click="handleToMicro2App">点击跳转</a-button>
    </div>
  </div>
</template>

<script>
import { helperFilterEmptyParam } from '../utils/helperFn';

const selectOptions = [];
for (let i = 0; i < 100; i++) {
  selectOptions.push({
    key: i,
    label: `option  ${i}`,
  });
}

export default {
  name: 'About',
  data() {
    return {
      data_SearchModel: {
        name: '',
      },
      data_CurrentPage: 1,
      data_CurrentPageSize: 10,
      data_SelectItemIds: [],
      data_wsUrl: '',
      isQiankun: window.__POWERED_BY_QIANKUN__,
      data_GlobalToken: '',
      data_SelectOptions: [],
      data_SelectValue: '',
      data_SelectLoading: false,
      data_SelectPageIndex: 1,
      data_SelectPageSize: 10,
      data_SelectPageTotal: 10,
    };
  },
  created() {
    this.local_OrderParams = {
      orderField: 'create_time',
      isAsc: false,
    };

    this.getOptionsData(this.data_SelectPageIndex, this.data_SelectPageSize);
  },
  mounted() {
    // ========================== websocket ==========================
    // const token = localStorage.getItem('token');
    // const hostName = document.location.host;
    // const hostProtocol = document.location.protocol === 'http:' ? 'ws:' : 'wss:';
    // this.data_wsUrl =
    //   process.env.NODE_ENV === 'production'
    //     ? `${hostProtocol}//${hostName}/asset/ws/push?token=${token}`
    //     : `ws://192.168.31.200:8080/asset/ws/push?token=${token}`;
    // // 建立socket连接
    // this.socketService.initWebSocket(this.data_wsUrl);
    // this.socketService.sendSock({}, this.updateState);
    // ========================== websocket ==========================
  },
  beforeDestroy() {
    // 组件销毁时主动关闭socket
    // this.socketService.webSocketClose();
  },
  methods: {
    showMessage() {
      this.$message.info('This is a normal message');
    },
    async updateState(wsData) {
      if (wsData?.type === 'MASK') {
        const params = helperFilterEmptyParam({
          ...this.local_OrderParams,
          name: this.data_SearchModel.name,
          pageIndex: this.data_CurrentPage,
          pageSize: this.data_CurrentPageSize,
        });
        const {
          data: { records, total },
        } = await this.$http.get('/task/taskList', { params });
        // 不可直接替换数据，查找更换数据状态
        if (records && records?.length) {
          //   this.$refs.taskTable.rebuildData.forEach(item => {
          //     const existItem = records.find(row => row.id === item.id);
          //     if(existItem) {
          //       item.status = existItem.status;
          //       this.$refs.taskTable.objData[item._index]._isDisabled = existItem.status === 'RUNNING' || existItem.status === 'DELETEING';
          //     }
          //   });
          // this.data_TableData = records;
          this.data_TableData = records.map(item => ({
            ...item,
            _checked: this.data_SelectItemIds.includes(item.taskId),
          }));
        }

        this.data_Total = total;
      }
    },
    async getOptionsData(page, limit) {
      if (page > this.data_SelectPageTotal) {
        return false;
      }
      setTimeout(() => {
        const res = selectOptions.slice((page - 1) * limit, page * limit);
        this.data_SelectOptions.push(...res);
        this.loading = false;
      }, 200);
    },
    handleSelectMore() {
      if (this.data_SelectPageIndex < this.data_SelectPageTotal) {
        this.data_SelectPageIndex += 1;
        this.getOptionsData(this.data_SelectPageIndex, this.data_SelectPageSize);
      }
    },
    handleToMicro2App() {
      const fromView = 'micro1';
      const state = {};
      const title = '';
      const url = `/micro2/about?fromView=${fromView}`;
      history.pushState(state, title, url);
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  padding: 24px 32px;

  .item-content {
    padding: 16px;
    margin-bottom: 12px;
    border: 1px dotted #e1e1e1;
  }
}
</style>
