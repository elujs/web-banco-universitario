<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
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
            <h2 class="font-semibold text-slate-800">Resumen rápido</h2>
            <p class="mt-2 text-sm text-slate-600">Consulta tu información principal desde un solo lugar.</p>
          </article>
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 class="font-semibold text-slate-800">Accesos directos</h2>
            <p class="mt-2 text-sm text-slate-600">El selector lateral te permitirá moverte entre secciones del banco.</p>
          </article>
        </div>
      </section>

        <Selector />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'

const balance = ref(0)
const lastUpdated = ref('')
const balanceLoading = ref(true)
const balanceError = ref(false)

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

onMounted(() => {
  loadBalance()
})
</script>
