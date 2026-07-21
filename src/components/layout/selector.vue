<template>
  <aside class="w-72 shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
    <div class="mb-4">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
        Acceso rápido
      </p>
      <h2 class="mt-1 text-lg font-semibold text-slate-800">Secciones del banco</h2>
    </div>

    <nav class="flex flex-col gap-2" aria-label="Selector de secciones">
      <button
        v-for="item in sections"
        :key="item.label"
        type="button"
        class="flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200"
        :class="item.active
          ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm'
          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-white'"
        @click="handleClick(item)"
      >
        <span class="flex items-center gap-3">
          <span class="text-lg">{{ item.icon }}</span>
          <span class="font-medium">{{ item.label }}</span>
        </span>
        <span v-if="item.routeName" class="text-xs font-semibold text-cyan-600">Ir</span>
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
  { label: 'Contactos frecuentes', icon: '👥', routeName: 'contactos', active: route.name === 'contactos' },
  { label: 'Seguridad', icon: '🔒', routeName: null, active: false },
])

function handleClick(item) {
  if (item.routeName) {
    router.push({ name: item.routeName })
  }
}
</script>
