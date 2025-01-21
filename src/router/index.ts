import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import BaseLayout from '~/layout/BaseLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Base',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('~/views/index.vue'),
      },
      {
        path: '/cloud',
        name: 'cloud',
        component: () => import('~/views/cloud.vue'),
      },
      {
        path: '/queue',
        name: 'queue',
        component: () => import('~/views/queue.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/views/login.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.name === 'Login') {
    if (token) {
      next({ name: 'Home' })
      return
    } else {
      next()
      return
    }
  } else {
    if (token) {
      next()
      return
    } else {
      next({ name: 'Login' })
      return
    }
  }
})
