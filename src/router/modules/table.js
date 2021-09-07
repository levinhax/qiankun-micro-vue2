const routes = [
  {
    path: '/scroll-table',
    name: 'scrollTable',
    component: () => import(/* webpackChunkName: "scroll-table" */ '../../views/Table/scroll.vue'),
  },
  {
    path: '/page-table',
    name: 'pageTable',
    component: () => import(/* webpackChunkName: "page-table" */ '../../views/Table/page.vue'),
  },
];

export default routes;
