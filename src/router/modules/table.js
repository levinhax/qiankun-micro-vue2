const routes = [
  {
    path: '/scroll-table',
    name: 'scrollTable',
    component: () => import(/* webpackChunkName: "scroll-table" */ '../../views/Table/scroll.vue'),
  },
];

export default routes;
