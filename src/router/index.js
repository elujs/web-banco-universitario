import { createRouter, createWebHistory } from 'vue-router'
import HomeInstitucional from '../views/HomeInstitucional.vue/index.js'
import bancaenlinea from '../views/banca/Bancaenlinea.vue'

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
  ],
})

export default router
