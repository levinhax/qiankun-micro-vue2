import axios from 'axios';
import { Message } from 'ant-design-vue';
import { removeToken } from './auth';

/**
 * 二次封装axios，报错、权限验证、跳转、拦截、提示等
 */

const CancelToken = axios.CancelToken;
window.cancelAxiosRequest = undefined;
// 放入一个全局数组，以便之后在router中统一取消
window.__axiosPromiseArr = [];

// 是否设置 HTTP 请求超时
const IS_HTTP_REQ_TIMEOUT = true;
// HTTP 请求超时时间 毫秒
// const HTTP_REQ_TIMEOUT = 300000;
const HTTP_REQ_TIMEOUT = 30 * 60 * 1000;

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: IS_HTTP_REQ_TIMEOUT ? HTTP_REQ_TIMEOUT : 0,
});

const handleDealConfig = config => config;

// 防止重复请求
const removePending = config => {
  for (let key in window.__axiosPromiseArr) {
    if (window.__axiosPromiseArr[key].url === config.url) {
      window.__axiosPromiseArr[key].func();
      window.__axiosPromiseArr.splice(key, 1);
    }
  }
};

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 取消重复请求
    if (!config.isNoPending) {
      removePending(config);
    }

    config.cancelToken = new CancelToken(cancel => {
      window.__axiosPromiseArr.push({
        url: config.url,
        func: cancel,
      });
    });

    //添加token
    // if(localStorage.getItem('token') && !urlWithoutToken.includes(config.url)) {
    //   config.headers.token = localStorage.getItem('token');
    // }
    config.headers.token = localStorage.getItem('token');

    return handleDealConfig(config);
  },
  error => {
    console.log('request err', error);
    if (axios.isCancel(error)) {
      console.log('Rquest canceled', error.message); // 请求如果被取消，这里是返回取消的message
    } else {
      // handle error
      console.log(error);
    }
    this.$Message.error({
      background: true,
      content: error,
    });
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  res => {
    if (res.request.responseType === 'blob') {
      return Promise.resolve(res);
    }

    const { data } = res;
    if (data.code === 0) {
      return Promise.resolve(data);
    }
    Message.error(data.message);
    // console.log(data.message);
    return Promise.reject(data);
  },
  error => {
    // console.log('response error', error);
    const { response } = error;
    if (response && (response.status === 503 || response.status === 401)) {
      removeToken();
      if (window.location.pathname !== '/login') {
        window.open('/login', '_self');
      }
    }

    if (axios.isCancel(error)) {
      // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
      return new Promise(() => {});
    }

    const errorMsg = error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorMsg);
  }
);

// 异步请求函数的错误捕获简化
export const request = async (method, url, params, options) => {
  const reuqestFun = async () => {
    let response = null;
    try {
      if (method === 'get') {
        response = await instance[method](url, { params, ...options });
      } else {
        response = await instance[method](url, params, { ...options });
      }
    } catch (err) {
      // console.log('err', err.message);
      return Promise.reject(err);
    }
    return response;
  };

  return await reuqestFun();
};

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, '$http', {
      value: instance,
    });
    Object.defineProperty(Vue.prototype, '$request', {
      value: request,
    });
  },
  instance,
};
