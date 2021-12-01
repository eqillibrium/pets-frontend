import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

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
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
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

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=auth')
  } else {
    next()
  }
})

export default router
