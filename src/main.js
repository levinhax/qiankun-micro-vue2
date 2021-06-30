import './public-path';
import actions from './shared/actions';

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
// import router from './router';
import store from './store';
import Http from './utils/http.js';

import { routes } from './router';
Vue.use(VueRouter);

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
import './setup/ant-design-vue';

Vue.use(Http);
import socketService from './utils/socket';
Vue.prototype.socketService = socketService;

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app');

// --------- 微前端应用处理 -----------

let instance = null;
let router = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render(props) {
  console.log('------ Micro1 子应用渲染 ------');

  if (props) {
    // 注入 actions 实例
    console.log(props);
    actions.setActions(props);
    props.onGlobalStateChange(state => {
      const { token } = state;
      console.log('Micro子应用渲染 token: ', token);
      if (token) {
        window.localStorage.setItem('token', token);
      }
    }, true);
    // props.setGlobalState(props.state); // 子应用监听和修改数据
    props.setGlobalState({
      token: 'aaa',
    });
  }

  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  router = new VueRouter({
    // 运行在主应用中时，添加路由命名空间 /micro1
    base: window.__POWERED_BY_QIANKUN__ ? '/micro1/' : '/',
    mode: 'history',
    routes,
  });
  // 挂载应用
  instance = new Vue({
    router,
    store,
    data() {
      return {
        parentRouter: props?.prop_data?.router,
      };
    },
    render: h => h(App),
  }).$mount('#app');
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('子应用单独运行');
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  // console.log('VueMicroApp bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  // console.log('VueMicroApp mount', props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  // console.log('VueMicroApp unmount');
  instance.$destroy();
  instance = null;
  router = null;
}
