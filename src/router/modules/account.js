
import Layout from '@/layout'

const accountRouter = {
  path: '/account',
  component: Layout,
  // redirect: 'lists',
  name: 'Account',
  meta: {
    roles: ['super_admin'],
    title: 'Quản lý tài khoản',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: 'role',
      component: () => import('@/views/account/role'),
      name: 'List Role',
      meta: { title: 'Quản lý quyền'
      // roles: ['role_boss_club', 'role_leader_club']
      }
    },
    {
      path: 'list-account-club',
      component: () => import('@/views/account/List'),
      name: 'List Account CLub',
      meta: { title: 'Quản lý tài khoản CLB'
      // roles: ['role_boss_club', 'role_leader_club']
      }
    }
  ]
}
export default accountRouter
