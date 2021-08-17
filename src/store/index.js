import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

const modulFiles = require.context('./modules', false, /.js$/);
const modules = {};
modulFiles.keys().forEach(key => {
  const moduleItem = modulFiles(key).default;
  Object.assign(modules, {
    ...moduleItem,
  });
});

const store = new Vuex.Store({
  modules,
});

export default store;
