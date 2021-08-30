import Vue from 'vue';
import permission from './permission';
import tableLoadMore from './tableLoadMore';

export function directive() {
  Vue.directive('permission', permission);
  Vue.directive('tableLoadMore', tableLoadMore);
}
