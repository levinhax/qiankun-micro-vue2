const HomeStore = {
  namespaced: true,
  state: {
    store_HomeName: '',
  },
  mutations: {
    setStoreHomeName(state, v) {
      state.store_HomeName = v;
    },
  },
  actions: {},
};

export default {
  homeStore: HomeStore,
};
