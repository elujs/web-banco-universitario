<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { 
    name: 'Inicio', 
    path: '/dashboard', 
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
  },
  { 
    name: 'Movimientos', 
    path: '/movements', 
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' 
  },
  { 
    name: 'Transferencias', 
    path: '/transfers', 
    iconPath: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' 
  },
  { 
    name: 'Contactos frecuentes', 
    path: '/contacts', 
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
  },
  { 
    name: 'Seguridad', 
    path: '/security', 
    iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' 
  }
]

const isActive = (path) => route.path === path
</script>

<template>
  <aside class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm w-full lg:w-72 shrink-0">
    <div class="mb-6">
      <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Acceso rápido</span>
      <h2 class="text-xl font-bold text-slate-900 mt-1">Secciones del banco</h2>
    </div>

    <nav class="space-y-2.5">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 p-3.5 rounded-2xl border transition-all group"
        :class="isActive(item.path) 
          ? 'bg-[#085F63] text-white border-[#085F63] shadow-md shadow-[#085F63]/20' 
          : 'bg-slate-50/50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 transition-colors shrink-0"
          :class="isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-[#085F63]'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
        </svg>
        <span class="text-sm font-semibold tracking-tight">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>