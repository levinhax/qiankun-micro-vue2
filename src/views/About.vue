<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary" @click="showMessage">Primary</a-button>
    <a-button>Default</a-button>
    <div>
      <a-button type="primary" @click="showMessage"></a-button>
      <a-button>Default</a-button>
      <p>主项目的数据：{{ data_GlobalToken }}, 点击变为 child_</p>
    </div>
  </div>
</template>

<script>
import { helperFilterEmptyParam } from '../utils/helperFn';

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
    };
  },
  created() {
    this.local_OrderParams = {
      orderField: 'create_time',
      isAsc: false,
    };
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
  },
};
</script>
