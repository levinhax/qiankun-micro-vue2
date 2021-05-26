import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Http from './utils/http.js';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
import './setup/ant-design-vue';

Vue.use(Http);
import socketService from './utils/socket';
Vue.prototype.socketService = socketService;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
