<script setup>
import { ref, onMounted } from 'vue'
import {
  Search,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  ArrowRight,
  Check,
} from 'lucide-vue-next'
import { transferService } from '@/services/transfersService'
import AppHeader from '@/components/layout/AppHeader.vue'
import Selector from '@/components/layout/selector.vue'

// Variables reactivas para datos reales
const myAccount = ref('')
const myBalance = ref(0)
const isLoadingData = ref(true)

const accountNumber = ref('')
const lookupStatus = ref('idle') // idle | loading | found | not_found
const recipientName = ref('')

const amount = ref('')
const description = ref('')
const isSubmitting = ref(false)
const errors = ref({})

// Estado para el modal de éxito personalizado
const showSuccessModal = ref(false)
const successDetails = ref({ amount: 0, recipient: '', description: '' })

// Cargar información inicial del usuario al montar la vista
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
    return
  }

  try {
    const userRes = await transferService.getWhoAmI()
    const userData = userRes.data?.data || userRes.data
    myAccount.value = userData.account_number

    const balanceRes = await transferService.getBalance()
    const balanceData = balanceRes.data?.data || balanceRes.data
    myBalance.value = balanceData.balance
  } catch (error) {
    console.error('Error al cargar los datos iniciales del usuario:', error)
    errors.value.global = 'No se pudo sincronizar la información de tu cuenta.'
  } finally {
    isLoadingData.value = false
  }
})

const handleAccountChange = (e) => {
  accountNumber.value = e.target.value.replace(/\D/g, '').slice(0, 20)
  lookupStatus.value = 'idle'
  recipientName.value = ''
  errors.value.accountNumber = ''
}

// Validar la cuenta destino
const handleLookup = async () => {
  if (accountNumber.value.length !== 20) {
    errors.value.accountNumber = 'La cuenta debe tener exactamente 20 dígitos.'
    return
  }
  if (accountNumber.value === myAccount.value) {
    errors.value.accountNumber = 'No puedes transferirte a ti mismo.'
    return
  }

  errors.value.accountNumber = ''
  lookupStatus.value = 'loading'

  try {
    const res = await transferService.verifyAccount(accountNumber.value)
    const userData = res.data?.data || res.data
    recipientName.value = `${userData.first_name} ${userData.last_name}`
    lookupStatus.value = 'found'
  } catch (error) {
    recipientName.value = ''
    lookupStatus.value = 'not_found'
  }
}

const validateForm = () => {
  errors.value = {}
  if (lookupStatus.value !== 'found') {
    errors.value.accountNumber = 'Presiona el botón "Verificar" para comprobar la cuenta destino.'
  }

  const amt = parseFloat(amount.value)
  if (!amount.value || isNaN(amt) || amt <= 0) errors.value.amount = 'Monto inválido.'
  else if (amt > myBalance.value) errors.value.amount = 'Fondos insuficientes.'

  return Object.keys(errors.value).length === 0
}

// Ejecutar Transferencia
const handleSubmit = async () => {
  if (!validateForm() || isSubmitting.value) return

  isSubmitting.value = true

  try {
    const payload = {
      account_number: accountNumber.value,
      amount: parseFloat(amount.value),
      description: description.value || 'Transferencia',
    }

    await transferService.createTransfer(payload)

    // Guardar detalles para el modal de éxito
    successDetails.value = {
      amount: parseFloat(amount.value),
      recipient: recipientName.value,
      description: description.value || 'Transferencia',
    }

    // Refrescar saldo actual
    const balanceRes = await transferService.getBalance()
    const balanceData = balanceRes.data?.data || balanceRes.data
    myBalance.value = balanceData.balance

    // Limpiar formulario y mostrar modal personalizado
    accountNumber.value = ''
    amount.value = ''
    description.value = ''
    lookupStatus.value = 'idle'
    showSuccessModal.value = true
  } catch (error) {
    errors.value.global = error.response?.data?.message || 'Error al transferir. Intente de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showSuccessModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 lg:p-8 font-['Montserrat']">
    <div class="max-w-7xl mx-auto space-y-6">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <div class="flex-1 space-y-6 flex flex-col">
          <!-- Encabezado de la sección -->
          <div
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085F63]/10 text-[#085F63]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4l-4-4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-900">
                  Apartado de <span class="text-[#085F63]">Transferencias</span>
                </h1>
                <p class="text-xs font-medium text-slate-400 mt-0.5">
                  Envía fondos a otra cuenta de forma segura y rápida.
                </p>
              </div>
            </div>
          </div>

          <!-- Contenedor del Formulario -->
          <div class="flex-1 flex justify-center items-center py-4">
            <div class="max-w-[560px] w-full mx-auto">
              <form
                @submit.prevent="handleSubmit"
                class="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 flex flex-col gap-7 shadow-sm"
              >
                <div>
                  <p class="text-[11px] font-semibold text-gray-500 tracking-wider uppercase mb-2">
                    Número de Cuenta Destino
                  </p>

                  <div class="flex gap-2.5 items-start">
                    <div class="flex-1">
                      <div
                        class="flex items-center gap-2.5 border-b pb-2.5"
                        :class="errors.accountNumber ? 'border-red-400' : 'border-gray-200'"
                      >
                        <input
                          type="text"
                          inputmode="numeric"
                          :value="accountNumber"
                          @input="handleAccountChange"
                          placeholder="0000 0000 0000 0000 0000"
                          class="flex-1 border-none outline-none text-sm text-gray-900 bg-transparent font-mono min-w-0"
                        />
                        <span class="text-[11px] text-gray-400 shrink-0"
                          >{{ accountNumber.length }}/20</span
                        >
                      </div>
                      <p v-if="errors.accountNumber" class="text-[11px] text-red-400 mt-1">
                        {{ errors.accountNumber }}
                      </p>
                    </div>

                    <!-- Botón Verificar con texto y diseño amigable -->
                    <button
                      type="button"
                      @click="handleLookup"
                      :disabled="lookupStatus === 'loading' || accountNumber.length !== 20"
                      class="flex items-center gap-2 px-4 h-10 rounded-xl border-none shrink-0 transition-all font-semibold text-xs cursor-pointer shadow-sm"
                      :class="
                        lookupStatus === 'found'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-[#085F63] text-white hover:bg-[#06474a] disabled:opacity-40 disabled:cursor-not-allowed'
                      "
                    >
                      <div
                        v-if="lookupStatus === 'loading'"
                        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      ></div>
                      <Search v-else :size="15" />
                      <span>{{ lookupStatus === 'found' ? 'Verificado' : 'Verificar' }}</span>
                    </button>
                  </div>

                  <!-- Estados de la cuenta verificada -->
                  <div
                    v-if="lookupStatus === 'found'"
                    class="flex items-center gap-2 mt-2 p-2.5 px-3 bg-emerald-50 rounded-xl border border-emerald-200"
                  >
                    <CheckCircle :size="16" class="text-emerald-600 shrink-0" />
                    <span class="text-xs text-emerald-800 font-medium"
                      >Destinatario: <strong class="font-bold">{{ recipientName }}</strong></span
                    >
                  </div>
                  <div
                    v-if="lookupStatus === 'not_found'"
                    class="flex items-center gap-2 mt-2 p-2.5 px-3 bg-red-50 rounded-xl border border-red-200"
                  >
                    <AlertCircle :size="16" class="text-red-500 shrink-0" />
                    <span class="text-xs text-red-600 font-medium"
                      >Cuenta no encontrada en el sistema.</span
                    >
                  </div>
                </div>

                <!-- Monto -->
                <div>
                  <div class="flex justify-between mb-2">
                    <p class="text-[11px] font-semibold text-gray-500 tracking-wider uppercase m-0">
                      Monto a Enviar
                    </p>
                    <span class="text-[11px] text-gray-400">
                      Disponible:
                      <strong class="text-[#085F63]">{{
                        isLoadingData ? 'Cargando...' : `$${myBalance.toFixed(2)}`
                      }}</strong>
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-2 border-b pb-2.5"
                    :class="errors.amount ? 'border-red-400' : 'border-gray-200'"
                  >
                    <DollarSign :size="17" class="text-gray-400 shrink-0" />
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      v-model="amount"
                      @input="errors.amount = ''"
                      placeholder="0.00"
                      class="flex-1 border-none outline-none text-2xl font-bold text-gray-900 bg-transparent w-full"
                    />
                  </div>
                  <p v-if="errors.amount" class="text-[11px] text-red-400 mt-1">
                    {{ errors.amount }}
                  </p>
                </div>

                <!-- Referencia -->
                <div>
                  <p class="text-[11px] font-semibold text-gray-500 tracking-wider uppercase mb-2">
                    Referencia / Concepto
                  </p>
                  <div class="flex items-center gap-2.5 border-b border-gray-200 pb-2.5">
                    <FileText :size="17" class="text-gray-400 shrink-0" />
                    <input
                      type="text"
                      maxlength="100"
                      v-model="description"
                      placeholder="Concepto del pago..."
                      class="flex-1 border-none outline-none text-sm text-gray-900 bg-transparent"
                    />
                  </div>
                </div>

                <p v-if="errors.global" class="text-xs text-red-500 text-center font-semibold">
                  {{ errors.global }}
                </p>

                <!-- Botón Ejecutar -->
                <button
                  type="submit"
                  :disabled="isSubmitting || isLoadingData"
                  class="flex items-center justify-center gap-2 w-full bg-[#085F63] text-white border-none rounded-xl p-3.5 text-sm font-semibold cursor-pointer hover:bg-[#06474a] transition-all shadow-md shadow-[#085F63]/20 disabled:opacity-60 disabled:cursor-wait"
                >
                  <template v-if="isSubmitting">Procesando Transacción...</template>
                  <template v-else
                    ><span>Ejecutar Transferencia</span><ArrowRight :size="17"
                  /></template>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE ÉXITO SUPERPUESTO (Diseño Profesional) -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in duration-200"
      >
        <div
          class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner"
        >
          <Check :size="32" stroke-width="3" />
        </div>

        <div>
          <h3 class="text-xl font-bold text-slate-900">¡Transferencia Exitosa!</h3>
          <p class="text-xs text-slate-400 mt-1">Los fondos han sido enviados correctamente.</p>
        </div>

        <div
          class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2 text-left"
        >
          <div class="flex justify-between text-xs">
            <span class="text-slate-500">Destinatario:</span>
            <span class="font-semibold text-slate-800">{{ successDetails.recipient }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-slate-500">Monto enviado:</span>
            <span class="font-bold text-[#085F63]">${{ successDetails.amount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-slate-500">Concepto:</span>
            <span class="text-slate-800 italic">{{ successDetails.description }}</span>
          </div>
        </div>

        <button
          @click="closeModal"
          class="w-full bg-[#085F63] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#06474a] transition-all cursor-pointer shadow-md shadow-[#085F63]/20"
        >
          Aceptar y Continuar
        </button>
      </div>
    </div>
  </div>
</template>
