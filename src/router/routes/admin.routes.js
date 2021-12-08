import auth from '../middleware/auth.middleware'
import admin from '../middleware/admin.middleware'

export default function () {
  return [
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/admin/Admin.vue'),
      meta: {
        layout: 'main',
        middleware: [
          auth,
          admin
        ]
      }
    }
  ]
}
