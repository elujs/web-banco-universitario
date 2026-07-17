<template>
  <aside class="w-72 shrink-0 rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-xl">
    <div class="mb-4">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
        Acceso rápido
      </p>
      <h2 class="mt-1 text-lg font-semibold text-white">Secciones del banco</h2>
    </div>

    <nav class="flex flex-col gap-2" aria-label="Selector de secciones">
      <button
        v-for="item in sections"
        :key="item.label"
        type="button"
        class="flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200"
        :class="item.active
          ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-sm'
          : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-500 hover:bg-slate-800'"
        @click="handleClick(item)"
      >
        <span class="flex items-center gap-3">
          <span class="text-lg">{{ item.icon }}</span>
          <span class="font-medium">{{ item.label }}</span>
        </span>
        <span v-if="item.routeName" class="text-xs text-cyan-300">Ir</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const sections = computed(() => [
  { label: 'Inicio', icon: '🏠', routeName: 'dashboard', active: route.name === 'dashboard' },
  { label: 'Movimientos', icon: '📄', routeName: 'movements', active: route.name === 'movements' },
  { label: 'Transferencias', icon: '↗️', routeName: null, active: false },
  { label: 'Contactos frecuentes', icon: '👥', routeName: null, active: false },
  { label: 'Seguridad', icon: '🔒', routeName: null, active: false },
])

function handleClick(item) {
  if (item.routeName) {
    router.push({ name: item.routeName })
  }
}
</script>
