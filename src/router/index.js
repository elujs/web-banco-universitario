import { createRouter, createWebHistory } from 'vue-router'

import HomeInstitucional from '../views/landing/HomeInstitucional.vue'
import Login from '../views/auth/Login.vue'
import UserRegister from '../views/auth/UserRegister.vue'
import Dashboard from '../views/banca/dashboard.vue'
import MovementsView from '../views/banca/MovementsView.vue'
import Contactos from '../views/banca/contactos.vue'
import SecurityView from '../views/banca/SecurityView.vue'
import TransferView from '../views/banca/TransferView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeInstitucional,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/auth/ForgotAccount.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/movements',
      name: 'movements',
      component: MovementsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/security',
      name: 'security',
      component: SecurityView,
      meta: { requiresAuth: true },
    },
    {
      path: '/transfers',
      name: 'transfers',
      component: TransferView,
      meta: { requiresAuth: true },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contactos,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
})

export default router
