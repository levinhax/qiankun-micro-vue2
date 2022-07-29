const routes = [
  {
    path: '/line-chart',
    name: 'lineChart',
    component: () => import(/* webpackChunkName: "line-chart" */ '../../views/Chart/line-bar'),
  },
  {
    path: '/assets-top8',
    name: 'assetsTop8',
    component: () => import(/* webpackChunkName: "assets-top8" */ '../../views/Chart/assets-top8'),
  },
  // {
  //   path: '/assets-chart',
  //   name: 'assetsChart',
  //   component: () =>
  //     import(/* webpackChunkName: "assets-chart" */ '../../views/Chart/assets-chart'),
  // },
  // {
  //   path: '/db-distribution',
  //   name: 'db-distribution',
  //   component: () =>
  //     import(/* webpackChunkName: "db-distribution" */ '../../views/Chart/db-distribution'),
  // },
];

export default routes;
