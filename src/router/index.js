import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Admin.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/applications',
    name: 'Applications',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Applications.vue')
  },
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
