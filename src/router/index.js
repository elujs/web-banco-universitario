import { createRouter, createWebHistory } from 'vue-router'

import HomeInstitucional from '../views/landing/HomeInstitucional.vue'
import Login from '../views/auth/Login.vue'
import UserRegister from '../views/auth/UserRegister.vue'
import MovementsView from '../views/banca/MovementsView.vue'

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
      path: '/movements',
      name: 'movements',
      component: MovementsView,
    },
  ],
})

export default router
