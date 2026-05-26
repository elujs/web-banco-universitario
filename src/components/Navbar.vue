<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
    <div class="hidden lg:flex items-center justify-between px-8 xl:px-12 py-4">
      <div class="flex items-center">
        <img src="@/assets/logo-no-background.png" alt="Banco Universitario" class="h-10 w-auto" />
      </div>

      <div class="flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-gray-600 hover:text-[#085F63] transition-colors text-sm font-medium whitespace-nowrap"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="$router.push('/banca')"
          class="text-gray-700 hover:text-[#085F63] border border-gray-300 hover:border-[#085F63] px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium whitespace-nowrap"
        >
          Iniciar Sesión
        </button>
        <button
          @click="$router.push('/banca')"
          class="bg-[#085F63] hover:bg-[#0a7a7f] text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#085F63]/30 text-sm font-semibold whitespace-nowrap"
        >
          Banca en Línea
        </button>
      </div>
    </div>

    <div class="lg:hidden">
      <div class="flex items-center justify-between px-4 sm:px-6 py-3">
        <div class="flex items-center">
          <img
            src="@/assets/logo-no-background.png"
            alt="Banco Universitario"
            class="h-8 sm:h-9 w-auto"
          />
        </div>
        <button
          class="p-2 text-gray-700 hover:text-[#085F63] transition-colors"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <component :is="mobileMenuOpen ? X : Menu" :size="24" />
        </button>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="px-4 sm:px-6 pb-4 space-y-4 animate-fadeIn border-t border-gray-100"
      >
        <div class="flex flex-col space-y-2 pt-4">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-gray-700 hover:text-[#085F63] transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="flex flex-col space-y-3 pt-4 border-t border-gray-100">
          <button
            @click="$router.push('/banca')"
            class="text-gray-700 hover:text-[#085F63] border border-gray-300 hover:border-[#085F63] py-3 px-4 rounded-full font-medium w-full"
          >
            Iniciar Sesión
          </button>
          <button
            @click="$router.push('/banca')"
            class="bg-[#085F63] hover:bg-[#0a7a7f] text-white py-3 px-4 rounded-full font-semibold w-full"
          >
            Banca en Línea
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
