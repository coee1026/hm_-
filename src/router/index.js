import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
const router = createRouter({
  // createWebHashHistory 哈希模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 访问拦截
router.beforeEach(async (to) => {
  // console.log(to, from)
  const userStore = useUserStore()
  const token = userStore.token
  if (to.path !== '/login' && !token) {
    return '/login'
  }
})

export default router
