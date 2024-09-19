import Layout from '@/layout'

const landingPageRouter = {
  path: '/landing-page',
  component: Layout,
  // redirect: 'lists',
  name: 'Landing Page',
  meta: {
    // roles: ['super_admin'],
    title: 'Quản lý Landing Page ',
    icon: 'el-icon-user'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/account/role'),
      name: 'Menu',
      meta: { title: 'Quản lý menu'
      }
    },
    {
      path: 'blog',
      component: () => import('@/views/account/List'),
      name: 'Blog',
      meta: { title: 'Quản lý bài đăng'
        // roles: ['role_boss_club', 'role_leader_club']
      }
    }
  ]
}
export default landingPageRouter
