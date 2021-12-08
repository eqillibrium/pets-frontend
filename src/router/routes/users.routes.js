// import auth from '../middleware/auth.middleware'
import Home from '../../views/Home'

export default function () {
  return [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'main'
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'main'
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/Register.vue')
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        layout: 'main'
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/applications',
      name: 'Applications',
      meta: {
        layout: 'main'
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/Applications.vue')
    }
  ]
}
