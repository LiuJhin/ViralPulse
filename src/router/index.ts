import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录',
        requiresAuth: false
      }
    },
    {
      path: '/layout',
      component: () => import('../layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: {
            title: '仪表盘',
            requiresAuth: true
          }
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('../views/404.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - ViralPulse`

  // 获取token
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (token && to.name === 'login') {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
})

export default router