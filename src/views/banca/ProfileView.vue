<script setup>
import { ref, onMounted } from 'vue'
import { Copy, Check } from 'lucide-vue-next'
import { getUserProfile } from '@/services/user'
import AppHeader from '@/components/layout/AppHeader.vue'
import Selector from '@/components/layout/selector.vue'

const isLoading = ref(true)
const copiedField = ref(null)
const errorMessage = ref('')

const user = ref({
  fullName: '',
  initials: '',
  accountNumber: '',
  documentNumber: '',
  birthDate: '',
  email: '',
  phone: '',
})

const formatBirthDate = (iso) => {
  if (!iso) return ''
  const date = new Date(iso)
  return date.toLocaleDateString('es-ES', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const copyToClipboard = (fieldName, text) => {
  navigator.clipboard.writeText(text).catch(() => {})
  copiedField.value = fieldName
  setTimeout(() => {
    copiedField.value = null
  }, 2000)
}

onMounted(async () => {
  try {
    const res = await getUserProfile()
    const data = res.data?.data || res.data

    user.value = {
      fullName: `${data.first_name} ${data.last_name}`,
      initials: `${data.first_name[0] || ''}${data.last_name[0] || ''}`.toUpperCase(),
      accountNumber: data.account_number,
      documentNumber: data.document_number,
      birthDate: data.birth_date,
      email: data.email,
      phone: data.phone_number,
    }
  } catch (error) {
    errorMessage.value = 'No se pudo cargar la información del perfil.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 lg:p-8 font-['Montserrat']">
    <div class="max-w-7xl mx-auto space-y-6">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <!-- Contenedor flexible adaptado a la rejilla de la vista -->
        <div class="flex-1 space-y-6 flex flex-col">
          <div
            v-if="isLoading"
            class="flex justify-center items-center h-64 bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <div
              class="w-12 h-12 border-4 border-gray-200 border-t-[#085f63] rounded-full animate-spin"
            ></div>
          </div>

          <div
            v-else-if="errorMessage"
            class="bg-red-50 text-red-500 p-4 rounded-3xl text-center border border-red-100"
          >
            {{ errorMessage }}
          </div>

          <div v-else class="space-y-6">
            <div
              class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <h1 class="text-2xl font-bold text-slate-900">
                  Mi <span class="text-[#085F63]">Perfil</span>
                </h1>
                <p class="text-xs font-medium text-slate-400 mt-0.5">
                  Información personal e institucional verificada por la plataforma.
                </p>
              </div>
            </div>

            <div
              class="bg-white rounded-3xl border border-gray-100 p-7 md:px-8 flex items-center gap-5 shadow-sm"
            >
              <div
                class="w-[72px] h-[72px] rounded-full bg-[#e8f5f5] flex items-center justify-center text-[22px] font-bold text-[#085f63] shrink-0"
              >
                {{ user.initials }}
              </div>
              <div>
                <p class="text-xl font-bold text-gray-900 mb-2">{{ user.fullName }}</p>
                <span
                  class="inline-flex items-center gap-1.5 bg-[#f0fafa] text-[#085f63] text-xs font-semibold px-3 py-1 rounded-full"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-green-600 inline-block"></span>
                  Usuario Activo
                </span>
              </div>
            </div>

            <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <p class="text-[13px] font-bold text-gray-900 mb-7">Detalles de la Cuenta</p>

              <div class="flex flex-wrap gap-6">
                <div class="min-w-full">
                  <p class="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Número de Cuenta
                  </p>
                  <div class="flex items-center gap-2">
                    <p class="text-[15px] font-semibold text-gray-900 break-all m-0 font-mono">
                      {{ user.accountNumber }}
                    </p>
                    <div class="relative inline-flex">
                      <button
                        @click="copyToClipboard('account', user.accountNumber)"
                        class="flex items-center justify-center w-7 h-7 rounded-lg border-none cursor-pointer transition-colors"
                        :class="
                          copiedField === 'account'
                            ? 'bg-[#f0fafa] text-[#085f63]'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        "
                      >
                        <Check v-if="copiedField === 'account'" :size="13" />
                        <Copy v-else :size="13" />
                      </button>
                      <div
                        v-if="copiedField === 'account'"
                        class="absolute bottom-9 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded-md text-[11px] whitespace-nowrap pointer-events-none"
                      >
                        ¡Copiado!
                      </div>
                    </div>
                  </div>
                  <div class="h-px bg-gray-100 mt-3"></div>
                </div>

                <div class="flex-1 min-w-[280px] max-w-full md:max-w-[calc(50%-12px)]">
                  <p class="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Cédula / Documento
                  </p>
                  <p class="text-[15px] font-semibold text-gray-900 m-0">
                    {{ user.documentNumber }}
                  </p>
                  <div class="h-px bg-gray-100 mt-3"></div>
                </div>

                <div class="flex-1 min-w-[280px] max-w-full md:max-w-[calc(50%-12px)]">
                  <p class="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Fecha de Nacimiento
                  </p>
                  <p class="text-[15px] font-semibold text-gray-900 m-0">
                    {{ formatBirthDate(user.birthDate) }}
                  </p>
                  <div class="h-px bg-gray-100 mt-3"></div>
                </div>

                <div class="flex-1 min-w-[280px] max-w-full md:max-w-[calc(50%-12px)]">
                  <p class="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Correo Electrónico
                  </p>
                  <p class="text-[15px] font-semibold text-gray-900 m-0 break-all">
                    {{ user.email }}
                  </p>
                  <div class="h-px bg-gray-100 mt-3"></div>
                </div>

                <div class="flex-1 min-w-[280px] max-w-full md:max-w-[calc(50%-12px)]">
                  <p class="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
                    Teléfono
                  </p>
                  <p class="text-[15px] font-semibold text-gray-900 m-0">{{ user.phone }}</p>
                  <div class="h-px bg-gray-100 mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
