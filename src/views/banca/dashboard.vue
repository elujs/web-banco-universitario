<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <section class="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Panel del banco</p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900">Bienvenido a tu banca universitaria</h1>
        <p class="mt-3 max-w-2xl text-slate-600">
          Aquí podrás encontrar tus opciones principales de forma rápida desde el panel lateral.
        </p>

        <article class="mt-6 rounded-3xl bg-gradient-to-r from-cyan-600 to-teal-500 p-5 text-white shadow-lg">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Saldo disponible</p>
              <p class="mt-2 text-3xl font-semibold">
                {{ balanceLoading ? 'Cargando...' : formatCurrency(balance) }}
              </p>
              <p class="mt-2 text-sm text-cyan-50">
                {{ balanceError ? 'No se pudo cargar el saldo' : `Cuenta principal • Última actualización ${formatDate(lastUpdated)}` }}
              </p>
            </div>
            <div class="rounded-2xl bg-white/20 px-3 py-2 text-sm font-medium">
              Activo
            </div>
          </div>
        </article>

        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 class="font-semibold text-slate-800">Número de cuenta</h2>
            <p class="mt-2 text-3xl font-semibold text-slate-900">
              {{ accountLoading ? 'Cargando...' : accountNumber || 'No disponible' }}
            </p>
            <p class="mt-2 text-sm text-slate-600">Tu cuenta principal asociada a esta banca.</p>
          </article>
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 class="font-semibold text-slate-800">Accesos rápidos</h2>
            <p class="mt-2 text-sm text-slate-600">Puedes revisar tus movimientos más recientes desde esta vista.</p>
          </article>
        </div>

        <section class="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-800">Últimos movimientos</h2>
              <p class="text-sm text-slate-600">Mira tus 8 operaciones más recientes desde el inicio.</p>
            </div>
            <a href="/movements" class="text-sm font-semibold text-cyan-600 hover:text-cyan-700">Ver todos</a>
          </div>

          <div v-if="recentMovementsLoading" class="mt-4 flex items-center gap-3 text-sm text-slate-600">
            <div class="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent"></div>
            Cargando movimientos recientes...
          </div>

          <div v-else-if="recentMovementsError" class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            No se pudieron cargar los movimientos recientes.
          </div>

          <div v-else-if="recentMovements.length === 0" class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600">
            Aún no tienes movimientos registrados.
          </div>

          <div v-else class="mt-4 space-y-3">
            <article
              v-for="movement in recentMovements"
              :key="movement.id"
              class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-semibold text-slate-800">{{ movement.description }}</p>
                <p class="mt-1 text-sm text-slate-500">{{ formatDate(movement.created_at) }}</p>
              </div>
              <div class="text-left sm:text-right">
                <p class="font-semibold" :class="movement.multiplier === 1 ? 'text-cyan-700' : 'text-slate-800'">
                  <span v-if="movement.multiplier === 1">+</span>
                  <span v-else>-</span>
                  {{ formatCurrency(movement.amount) }}
                </p>
                <p class="mt-1 text-sm text-slate-500">Saldo: {{ formatCurrency(movement.balance) }}</p>
              </div>
            </article>
          </div>
        </section>
      </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'
import { getMovements } from '../../services/movementService'

const balance = ref(0)
const lastUpdated = ref('')
const accountNumber = ref('')
const balanceLoading = ref(true)
const balanceError = ref(false)
const accountLoading = ref(true)
const recentMovements = ref([])
const recentMovementsLoading = ref(true)
const recentMovementsError = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

const formatDate = (value) => {
  if (!value) return 'recientemente'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const loadBalance = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    balanceError.value = true
    balanceLoading.value = false
    return
  }

  try {
    const response = await axios.get('/v1/client/user/balance', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'es',
      },
    })

    const payload = response?.data?.data ?? response?.data ?? {}
    balance.value = Number(payload?.balance ?? 0)
    lastUpdated.value = payload?.last_time ?? payload?.updated_at ?? payload?.updatedAt ?? payload?.date ?? ''
    balanceError.value = false
  } catch (error) {
    console.error('Error al cargar el balance:', error)
    balanceError.value = true
  } finally {
    balanceLoading.value = false
  }
}

const loadAccountNumber = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    accountLoading.value = false
    return
  }

  try {
    const response = await axios.get('/v1/client/user/whoami', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'es',
      },
    })

    const payload = response?.data?.data ?? response?.data ?? {}
    const fetchedAccountNumber = payload?.account_number ?? payload?.accountNumber ?? payload?.number ?? ''
    accountNumber.value = fetchedAccountNumber ? String(fetchedAccountNumber) : ''
    if (fetchedAccountNumber) {
      localStorage.setItem('accountNumber', String(fetchedAccountNumber))
    }
  } catch (error) {
    console.error('Error al cargar el número de cuenta:', error)
  } finally {
    accountLoading.value = false
  }
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
  await loadBalance()
  await loadAccountNumber()
  await loadRecentMovements()
})
</script>
