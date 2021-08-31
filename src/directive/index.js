import Vue from 'vue';
import permission from './permission';
import tableLoadMore from './tableLoadMore';
import loadMore from './loadMore';

export function directive() {
  Vue.directive('permission', permission);
  Vue.directive('tableLoadMore', tableLoadMore);
  Vue.directive('loadMore', loadMore);
}
