<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, LogOut } from 'lucide-vue-next'
import logoImage from '@/assets/logo-no-background.png'

const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenuOnClickOutside = (e) => {
  if (!e.target.closest('.user-menu-container')) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  isMenuOpen.value = false
  router.replace('/login')
}

const goToProfile = () => {
  isMenuOpen.value = false
  router.push('/profile')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const userName = computed(() => {
  const name = localStorage.getItem('userName')
  return name ? name : 'Invitado'
})

const initials = computed(() => {
  const name = userName.value
  if (!name || name === 'Usuario' || name === 'Invitado') return '??'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-8 font-['Montserrat']">
    <!-- Logo interactivo que redirige al inicio -->
    <button
      @click="goToDashboard"
      class="bg-white px-6 py-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center shrink-0 cursor-pointer hover:border-slate-200 transition-colors"
    >
      <img :src="logoImage" alt="Banco Universitario" class="h-9 w-auto object-contain" />
    </button>

    <header
      class="bg-white px-8 py-6 rounded-xl border border-gray-100 shadow-sm flex-1 flex justify-between items-center relative"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          <span class="text-[#085F63]">¡Hola, {{ userName }}!</span>
          <span class="font-normal text-gray-500 ml-2 hidden md:inline"
            >Bienvenido a tu Banca en Línea.</span
          >
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative">
          <button class="text-gray-400 hover:text-[#085F63] transition-colors cursor-pointer">
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
            <span
              class="absolute top-0 right-0 w-2.5 h-2.5 bg-[#49beb7] rounded-full border-2 border-white"
            ></span>
          </button>
        </div>

        <div class="relative user-menu-container flex items-center gap-3">
          <button
            @click="goToProfile"
            title="Ir a mi perfil"
            class="bg-[#085F63] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm cursor-pointer hover:bg-[#06474a] transition-colors focus:outline-none"
          >
            {{ initials }}
          </button>

          <button
            @click.stop="toggleMenu"
            title="Opciones de cuenta"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
          >
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>

          <!-- Menú desplegable -->
          <div
            v-if="isMenuOpen"
            class="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <button
              @click="goToProfile"
              class="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <User :size="15" class="text-[#085F63]" />
              Mi Perfil
            </button>
            <div class="h-px bg-gray-100 my-1"></div>
            <button
              @click="handleLogout"
              class="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut :size="15" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
