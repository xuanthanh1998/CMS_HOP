
import Layout from '@/layout'

const hioRouter = {
  path: '/hio',
  component: Layout,
  // redirect: 'lists',
  name: 'HIO',
  meta: {
    roles: ['super_admin'],
    title: 'Quản lý HIO',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: 'package-s',
      component: () => import('@/views/HIO/insuranceS/qr/index.vue'),
      name: 'QR',
      meta: { title: 'Quản lý qr'
        // roles: ['role_boss_club', 'role_leader_club']
      }
    }
  ]
}
export default hioRouter
