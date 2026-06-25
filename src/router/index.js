import { createRouter, createWebHistory } from 'vue-router'

import HomeInstitucional from '../views/landing/HomeInstitucional.vue'
import bancaenlinea from '../views/banca/Bancaenlinea.vue'
import UserRegister from '../views/auth/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeInstitucional,
    },
    {
      path: '/banca',
      name: 'banca',
      component: bancaenlinea,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
  ],
})

export default router
