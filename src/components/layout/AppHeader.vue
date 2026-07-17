<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  router.push('/login')
}

// Obtenemos el nombre del usuario

const userName = computed(() => {
  const name = localStorage.getItem('userName')
  return name ? name : 'Invitado'
})

// Calculamos iniciales
const initials = computed(() => {
  const name = userName.value
  if (!name || name === 'Usuario') return '??'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})
</script>

<template>
  <header
    class="bg-white px-8 py-6 rounded-xl border border-gray-100 shadow-sm mb-8 flex justify-between items-center"
  >
    <div>
      <h1 class="text-2xl font-bold text-gray-800">
        <span class="text-[#085F63]">¡Hola, {{ userName }}!</span>
        <span class="font-normal text-gray-500 ml-2">Bienvenido a tu Banca en Línea.</span>
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <!-- Campana -->
      <div class="relative">
        <!-- Campana con silueta -->
        <div class="relative">
          <button class="text-gray-400 hover:text-[#085F63] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <!-- El puntito de notificación verde -->
            <span
              class="absolute top-0 right-0 w-2.5 h-2.5 bg-[#49beb7] rounded-full border-2 border-white"
            ></span>
          </button>
        </div>
        <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-[#49beb7] rounded-full"></span>
      </div>

      <!-- Menú de usuario -->
      <div class="relative" @mouseenter="isMenuOpen = true" @mouseleave="isMenuOpen = false">
        <button class="flex items-center gap-2">
          <div
            class="bg-[#085F63] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold"
          >
            {{ initials }}
          </div>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div
          v-if="isMenuOpen"
          class="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
        >
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
