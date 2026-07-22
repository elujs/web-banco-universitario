<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Movimientos Recientes</h2>
        <p class="text-xs text-slate-400">Descripción · Fecha · Saldo</p>
      </div>
      <a href="/movements" class="text-sm font-semibold text-[#085F63] hover:underline">Ver todos →</a>
    </div>

    <div v-if="recentMovementsLoading" class="py-8 text-center text-sm text-slate-500">
      Cargando movimientos recientes...
    </div>

    <div v-else-if="recentMovementsError" class="py-8 text-center text-sm text-red-500">
      No se pudieron cargar los movimientos recientes.
    </div>

    <div v-else-if="recentMovements.length === 0" class="py-8 text-center text-sm text-slate-500">
      Aún no tienes movimientos registrados.
    </div>

    <div v-else class="divide-y divide-slate-100">
      <div
        v-for="movement in recentMovements"
        :key="movement.id"
        class="flex items-center justify-between py-4"
      >
        <!-- Lado izquierdo: Icono de flecha + Descripción y Fecha -->
        <div class="flex items-center gap-4">
          <!-- Contenedor del icono con condicional de color -->
          <div 
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :class="movement.multiplier === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'"
          >
            <!-- Flecha hacia arriba (Ingreso) o hacia abajo (Egreso) -->
            <svg v-if="movement.multiplier === 1" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-6v12" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 6V6" />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-slate-900">{{ movement.description }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ formatDateShort(movement.created_at) }}</p>
          </div>
        </div>

        <!-- Lado derecho: Monto y Saldo -->
        <div class="text-right">
          <p class="font-bold" :class="movement.multiplier === 1 ? 'text-emerald-600' : 'text-slate-900'">
            <span v-if="movement.multiplier === 1">+</span>
            <span v-else>-</span>
            {{ formatCurrency(movement.amount) }}
          </p>
          <p class="text-xs text-slate-400 mt-0.5">{{ formatCurrency(movement.balance) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMovements } from '../../../services/movementService'

const recentMovements = ref([])
const recentMovementsLoading = ref(true)
const recentMovementsError = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

const formatDateShort = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const loadRecentMovements = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    recentMovementsLoading.value = false
    return
  }

  recentMovementsLoading.value = true
  recentMovementsError.value = false

  try {
    const response = await getMovements(1, 8, {})
    const payload = response?.data?.data ?? []
    const movementsList = Array.isArray(payload) ? payload : []

    recentMovements.value = [...movementsList]
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 8)
  } catch (error) {
    console.error('Error al cargar los movimientos recientes:', error)
    recentMovementsError.value = true
    recentMovements.value = []
  } finally {
    recentMovementsLoading.value = false
  }
}

onMounted(async () => {
  await loadRecentMovements()
})
</script>