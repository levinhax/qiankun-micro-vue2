const routes = [
  {
    path: '/virtual-list',
    name: 'virtualList',
    component: () => import(/* webpackChunkName: "virtual-list" */ '../../views/Virtual/index.vue'),
  },
];

export default routes;
