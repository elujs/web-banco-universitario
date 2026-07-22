import { createRouter, createWebHistory } from 'vue-router'

import HomeInstitucional from '../views/landing/HomeInstitucional.vue'
import Login from '../views/auth/Login.vue'
import UserRegister from '../views/auth/UserRegister.vue'
import Dashboard from '../views/banca/dashboard.vue'
import MovementsView from '../views/banca/MovementsView.vue'
import Contactos from '../views/banca/contactos.vue'

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
      path: '/contactos',
      name: 'contactos',
      component: Contactos,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router
