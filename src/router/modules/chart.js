const routes = [
  {
    path: '/line-chart',
    name: 'lineChart',
    component: () => import(/* webpackChunkName: "line-chart" */ '../../views/Chart/line-bar'),
  },
];

export default routes;
