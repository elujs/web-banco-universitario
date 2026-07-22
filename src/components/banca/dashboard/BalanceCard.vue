<template>
  <div class="rounded-3xl bg-[#085F63] p-8 text-white shadow-md">
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <!-- Bloque de Saldo con el turquesa original y tipografía elegante -->
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-teal-200"></span>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-teal-100/80">Saldo disponible</p>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ balanceLoading ? 'Cargando...' : formatCurrency(balance) }}
        </h2>
        <p class="text-xs text-teal-100/70">
          Última actualización: {{ formatDate(lastUpdated) }}
        </p>
      </div>

      <!-- Bloque de Número de Cuenta con botón de copiar integrado -->
      <div class="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 flex flex-col gap-1.5 min-w-[280px]">
        <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-teal-100/80">Número de cuenta</p>
        
        <div class="flex items-center justify-between gap-3">
          <span class="font-mono text-sm font-semibold text-white tracking-wider">
            {{ accountLoading ? 'Cargando...' : accountNumber || 'No disponible' }}
          </span>

          <button 
            @click="copyAccountNumber"
            class="relative flex items-center justify-center rounded-xl bg-white/15 p-2 text-white transition-all hover:bg-white/25 active:scale-95"
            title="Copiar número de cuenta"
          >
            <!-- Icono de Copiar -->
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <!-- Icono de Check (Copiado exitoso) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <!-- Tooltip flotante -->
            <span v-if="copied" class="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white shadow-md">
              ¡Copiado!
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const balance = ref(0)
const lastUpdated = ref('')
const accountNumber = ref('')
const balanceLoading = ref(true)
const accountLoading = ref(true)
const copied = ref(false)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
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
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date)
}

const copyAccountNumber = async () => {
  if (!accountNumber.value) return
  try {
    await navigator.clipboard.writeText(accountNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  }
}

const loadBalance = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
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
  } catch (error) {
    console.error('Error al cargar el balance:', error)
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

onMounted(async () => {
  await loadBalance()
  await loadAccountNumber()
})
</script>