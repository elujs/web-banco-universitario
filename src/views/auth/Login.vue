<template>
  <div class="min-h-screen flex" style="font-family: 'Montserrat', sans-serif">
    <div
      class="hidden lg:flex flex-col"
      style="background-color: #044347; width: 50%; min-height: 100vh"
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
          Tu universidad, tus metas, tu dinero. Gestiona todo en un solo lugar.
        </p>
      </div>

      <div class="p-12 opacity-20">
        <div class="w-full h-px bg-white"></div>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center bg-white relative w-full lg:w-1/2 min-h-screen"
    >
      <button
        @click="$router.push('/')"
        class="absolute top-8 right-8 text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm"
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
        Volver al inicio
      </button>

      <div class="lg:hidden mb-10 mt-16">
        <img
          src="@/assets/logo-no-background.png"
          alt="Banco Universitario"
          class="w-48 h-auto object-contain"
        />
      </div>

      <div class="w-full max-w-md px-6 sm:px-8">
        <h1 class="text-gray-900 mb-3 text-4xl font-bold tracking-tight">Iniciar Sesión</h1>
        <p class="text-gray-500 mb-12 text-base">Ingresa tus credenciales para continuar</p>

        <div
          v-if="errorMessage"
          class="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-semibold text-center"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-8">
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

          <div>
            <label class="block text-gray-600 mb-3 text-sm font-bold uppercase tracking-wider">
              Contraseña
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
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••"
                class="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 text-lg font-medium tracking-widest"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-[#085f63] transition-colors shrink-0 outline-none"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  />
                  <path
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              type="button"
              class="text-[#49beb7] hover:underline transition-all font-semibold text-sm"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#085F63] text-white py-4 transition-all flex justify-center items-center gap-2 rounded-2xl text-lg font-semibold shadow-md mt-4"
            :class="
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0a7a7f] active:scale-[0.99]'
            "
          >
            <span
              v-if="isLoading"
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></span>
            {{ isLoading ? 'Conectando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <p class="text-center mt-10 text-gray-500 text-base">
          ¿No tienes una cuenta?
          <button
            @click="$router.push('/register')"
            class="font-bold text-[#49beb7] hover:underline transition-all"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/v1/public/client/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al iniciar sesión')
    }

    if (result.data && result.data.jwt) {
      localStorage.setItem('token', result.data.jwt)
      router.push('/movements')
    } else {
      throw new Error('No se recibió el token de acceso')
    }
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      errorMessage.value =
        'No se pudo conectar con el servidor. Verifica que Docker y la API estén encendidos.'
    } else {
      errorMessage.value = error.message || 'Ocurrió un error inesperado.'
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
