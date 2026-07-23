<template>
  <div class="min-h-screen flex" style="font-family: 'Montserrat', sans-serif">
    <div
      class="hidden lg:flex flex-col w-1/2"
      style="background-color: #044347; min-height: 100vh"
    >
      <div class="p-12">
        <img
          src="@/assets/logo-no-background.png"
          alt="Banco Universitario"
          class="w-56 h-auto object-contain brightness-0 invert"
        />
      </div>

      <div class="flex-1 flex items-center justify-center px-16">
        <p class="text-white text-center text-4xl font-bold max-w-lg leading-tight tracking-tight">
          No te preocupes, a todos nos pasa. Recupera el acceso a tu cuenta con ayuda de un código.
        </p>
      </div>

      <div class="p-12 opacity-20">
        <div class="w-full h-px bg-white"></div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center bg-white relative w-full lg:w-1/2 min-h-screen px-6 py-12">
      <button
        @click="$router.push('/login')"
        class="absolute top-6 right-6 text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver al login
      </button>

      <div class="lg:hidden mb-10 mt-16">
        <img
          src="@/assets/logo-no-background.png"
          alt="Banco Universitario"
          class="w-48 h-auto object-contain"
        />
      </div>

      <div class="w-full max-w-md">
        <template v-if="stage === 'request'">
          <h1 class="text-gray-900 mb-4 text-4xl font-bold tracking-tight">Olvido contraseña</h1>
          <p class="text-gray-500 mb-10 text-base">
            Ingresa tu correo para recibir un código de recuperación.
          </p>

          <form @submit.prevent="handleRecover" class="space-y-8">
            <div>
              <label class="block text-gray-600 mb-3 text-sm font-bold uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div
                class="flex items-center gap-4 border-b-2 border-gray-200 pb-3 transition-all focus-within:border-[#085f63]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-400 shrink-0"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  v-model="email"
                  placeholder="usuario@correo.com"
                  class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 text-lg font-medium"
                  required
                  :disabled="isLoading"
                />
              </div>
            </div>

            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-semibold text-center">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-sm font-semibold text-center">
              {{ successMessage }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#085F63] text-white py-4 transition-all flex justify-center items-center gap-2 rounded-2xl text-lg font-semibold shadow-md"
              :class="isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0a7a7f] active:scale-[0.99]'"
            >
              <span
                v-if="isLoading"
                class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></span>
              {{ isLoading ? 'Enviando...' : 'Enviar correo' }}
            </button>
          </form>
        </template>

        <template v-else>
          <h1 class="text-gray-900 mb-4 text-4xl font-bold tracking-tight">Restablecer contraseña</h1>
          <p class="text-gray-500 mb-10 text-base">
            Completa los datos para actualizar tu contraseña.
          </p>

          <form @submit.prevent="handleResetPassword" class="space-y-8">
            <div>
              <label class="block text-gray-600 mb-3 text-sm font-bold uppercase tracking-wider">
                Correo
              </label>
              <div class="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-700 text-base font-medium">
                {{ sentEmail }}
              </div>
            </div>

            <div>
              <label class="block text-gray-600 mb-3 text-sm font-bold uppercase tracking-wider">
                Código de verificación
              </label>
              <div
                class="flex items-center gap-4 border-b-2 border-gray-200 pb-3 transition-all focus-within:border-[#085f63]"
              >
                <input
                  type="text"
                  v-model="verificationCode"
                  placeholder="123456"
                  class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 text-lg font-medium"
                  required
                  :disabled="isLoading"
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-600 mb-3 text-sm font-bold uppercase tracking-wider">
                Nueva contraseña
              </label>
              <div
                class="flex items-center gap-4 border-b-2 border-gray-200 pb-3 transition-all focus-within:border-[#085f63]"
              >
                <input
                  type="password"
                  v-model="newPassword"
                  placeholder="••••••••"
                  class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 text-lg font-medium tracking-widest"
                  required
                  :disabled="isLoading"
                />
              </div>
            </div>

            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-semibold text-center">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-sm font-semibold text-center">
              {{ successMessage }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#085F63] text-white py-4 transition-all flex justify-center items-center gap-2 rounded-2xl text-lg font-semibold shadow-md"
              :class="isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0a7a7f] active:scale-[0.99]'"
            >
              <span
                v-if="isLoading"
                class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></span>
              {{ isLoading ? 'Actualizando...' : 'Actualizar contraseña' }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const sentEmail = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const stage = ref('request')

const handleRecover = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/v1/public/client/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
      },
      body: JSON.stringify({ email: email.value }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el correo de recuperación')
    }

    sentEmail.value = email.value
    stage.value = 'reset'
    successMessage.value = result.message || 'El código se envió correctamente. Revisa tu correo.'
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      errorMessage.value = 'No se pudo conectar con el servidor. Verifica que la API esté disponible.'
    } else {
      errorMessage.value = error.message || 'Ocurrió un error al enviar el correo de recuperación.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleResetPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/v1/public/client/user/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
      },
      body: JSON.stringify({
        email: sentEmail.value,
        code: verificationCode.value,
        password: newPassword.value,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al actualizar la contraseña')
    }

    successMessage.value = result.message || 'Tu contraseña se actualizó correctamente.'
    verificationCode.value = ''
    newPassword.value = ''
    stage.value = 'request'
    email.value = ''
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      errorMessage.value = 'No se pudo conectar con el servidor. Verifica que la API esté disponible.'
    } else {
      errorMessage.value = error.message || 'Ocurrió un error al actualizar la contraseña.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
