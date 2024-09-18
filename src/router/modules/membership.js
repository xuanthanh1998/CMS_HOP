
import Layout from '@/layout'

const membershipRouter = {
  path: '/membership',
  component: Layout,
  redirect: 'lists',
  name: 'Membership',
  meta: {
    roles: ['role_admin_business'],
    title: 'Khách hàng thân thiết',
    icon: 'el-icon-s-custom'
    // Boss, SA-A-SAG-AG (ALL)
  },
  children: [
    {
      path: 'list-golfer',
      component: () => import('@/views/membership/listGolfer/listGolferAll'),
      name: 'List golfer ',
      meta: { title: 'Danh sách Golfer' }
      // BOSS ONLY
    },
    {
      path: 'list',
      component: () => import('@/views/customer/List'),
      name: 'List Loyal Customer',
      meta: { title: 'Nâng hạng KH Infinite' }
    },
    {
      path: 'list-info-customer',
      component: () => import('@/views/membership/inforCustomer/index.vue'),
      name: 'List Info Customer',
      meta: { title: 'Quản lý thông tin KH' }
    },
    {
      path: 'list-document',
      component: () => import('@/views/membership/document/Index'),
      name: 'List document',
      meta: { title: 'Quản lý văn bản' }
    },
    {
      path: 'direct-customer',
      component: () => import('@/views/membership/directCustomer/Index'),
      name: 'Direct customer',
      meta: { title: 'Quản lý CSKH trực tiếp' }
    },
    {
      path: 'media-customer',
      component: () => import('@/views/membership/mediaCustomer/Index'),
      name: 'Media customer',
      meta: { title: 'Quản lý truyền thông KH' }
    },
    {
      path: 'feedback-customer',
      component: () => import('@/views/membership/feedbackCustomer/index'),
      name: 'Feedback customer',
      meta: { title: 'Đánh giá khách hàng' }
    }
  ]
}
export default membershipRouter
