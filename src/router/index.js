import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/index'),
    beforeEnter: (from, to, next) => {
      if (store.getters['auth/accessToken']) {
        next('/');
      } else {
        next();
      }
    },
    children: [
      {
        alias: '/auth',
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/register'),
      },
    ],
  },
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/index'),
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/accessToken']) {
        next();
      } else {
        next('auth');
      }
    },
    children: [
      {
        alias: '',
        path: 'products',
        name: 'products',
        component: () => import(/* webpackChunkName: "products" */ '@/views/main/products'),
      },
    ],
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import(/* webpackChunkName: "terms" */ '@/views/terms'),
  },
  {
    path: '*',
    redirect: () => ({ path: store.getters['auth/accessToken'] ? '/' : '/auth' }),
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
