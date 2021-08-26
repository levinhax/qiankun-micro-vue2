<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px; height: 200px" />
    <p>{{ store_HomeName }}</p>
    <a-button type="primary" @click="handleUpdate">更新父应用数据</a-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import actions from '../shared/actions';

export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    ...mapState('homeStore', ['store_HomeName']),
  },
  methods: {
    handleUpdate() {
      actions.setGlobalState({
        qiankun_GlobalName: '乾坤 vue2',
      });
    },
  },
};
</script>
