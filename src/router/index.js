// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

import tableRoute from './modules/table';
import chartRoute from './modules/chart';

// Vue.use(VueRouter);

export const routes = [
  {
    path: '/home',
    name: 'Home',
    // component: Home,
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/form-mix',
    name: 'formMix',
    component: () => import(/* webpackChunkName: "form-mix" */ '../views/Form/form-mix.vue'),
  },
  ...tableRoute,
  ...chartRoute,
];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;
