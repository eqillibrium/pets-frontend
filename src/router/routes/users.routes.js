import Home from '../../views/Home'
import auth from '../middleware/auth.middleware'

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
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        layout: 'main',
        middleware: [
          auth
        ]
      },
      component: () => import(/* webpackChunkName: "about" */ '@/views/user/Profile.vue')
    },
    {
      path: '/profile/applications',
      name: 'UserApps',
      component: () => import(/* webpackChunkName: "about" */ '@/views/user/Applications.vue'),
      meta: {
        layout: 'main',
        middleware: [
          auth
        ]
      }
    }
  ]
}
