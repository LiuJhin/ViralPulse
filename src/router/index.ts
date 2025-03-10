import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/home/index.vue'),
          meta: {
            title: '首页',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录',
        requiresAuth: false
      }
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
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router