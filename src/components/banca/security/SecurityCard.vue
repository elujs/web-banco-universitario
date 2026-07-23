<script setup>
import { ref } from 'vue'
import { updatePassword } from '@/services/user'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleUpdatePassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas nuevas no coinciden.'
    return
  }

  if (newPassword.value.length < 6) {
    errorMessage.value = 'La nueva contraseña debe tener al menos 6 caracteres.'
    return
  }

  isLoading.value = true

  try {
    await updatePassword(currentPassword.value, newPassword.value, confirmPassword.value)

    successMessage.value = '¡Contraseña actualizada exitosamente!'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error('Error detallado de la API:', error.response?.data)
    errorMessage.value = error.response?.data?.message || 'Error al actualizar la contraseña. Verifica que tu contraseña actual sea correcta.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 w-full max-w-xl">
    <!-- Encabezado -->
    <div class="flex items-center gap-4 pb-6 border-b border-slate-100">
      <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#085F63] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <h2 class="text-lg font-bold text-slate-900">Actualizar Contraseña</h2>
        <p class="text-xs text-slate-400">Introduce tus credenciales para realizar el cambio.</p>
      </div>
    </div>

    <!-- Alertas -->
    <div v-if="successMessage" class="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-2xl">
      {{ errorMessage }}
    </div>

    <!-- Formulario -->
    <form @submit.prevent="handleUpdatePassword" class="space-y-6 pt-6">
      
      <!-- Current Password -->
      <div>
        <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Contraseña Actual</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input 
            v-model="currentPassword" 
            :type="showCurrent ? 'text' : 'password'" 
            required 
            placeholder="••••••••" 
            class="w-full pl-11 pr-12 py-3 text-sm text-slate-700 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-[#085F63] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#085F63] transition-all"
          />
          <button type="button" @click="showCurrent = !showCurrent" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- New Password -->
      <div>
        <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Nueva Contraseña</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input 
            v-model="newPassword" 
            :type="showNew ? 'text' : 'password'" 
            required 
            placeholder="Mín. 6 caracteres" 
            class="w-full pl-11 pr-12 py-3 text-sm text-slate-700 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-[#085F63] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#085F63] transition-all"
          />
          <button type="button" @click="showNew = !showNew" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Confirm New Password -->
      <div>
        <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Confirmar Nueva Contraseña</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input 
            v-model="confirmPassword" 
            :type="showConfirm ? 'text' : 'password'" 
            required 
            placeholder="Repite la nueva contraseña" 
            class="w-full pl-11 pr-12 py-3 text-sm text-slate-700 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-[#085F63] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#085F63] transition-all"
          />
          <button type="button" @click="showConfirm = !showConfirm" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Botón Submit -->
      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full py-4 bg-[#085F63] hover:bg-[#064a4d] text-white rounded-2xl font-bold text-sm shadow-md shadow-[#085F63]/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        <div v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span>{{ isLoading ? 'Actualizando...' : 'Actualizar Contraseña' }}</span>
      </button>

    </form>
  </div>
</template>