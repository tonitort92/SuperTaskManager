import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import ('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.user !== null

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'auth' })
  } else if ((to.name === 'auth' || to.name === 'signup') && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
