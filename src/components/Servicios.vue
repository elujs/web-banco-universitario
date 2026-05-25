<template>
  <section id="servicios" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      
      <h2 class="text-4xl font-extrabold text-[#030213] text-center mb-12 tracking-tight font-alternates">
      Nuestros Productos
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <article
          v-for="service in services"
          :key="service.title"
          class="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[380px]"
        >
          <div class="w-full">
            <div class="bg-[#e9ebef] p-4 rounded-xl inline-flex items-center justify-center mb-6 text-[#085F63]">
              <component :is="service.icon" :size="28" />
            </div>

            <h3 class="text-xl font-bold text-[#030213] mb-3">
              {{ service.title }}
            </h3>

            <p class="text-gray-500 text-sm leading-relaxed mb-6">
              {{ service.description }}
            </p>
          </div>

          <button class="w-full bg-[#085F63] hover:bg-[#0a7a7f] text-white py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#085F63]/20">
            Saber más
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Importamos los iconos correctos usando la librería oficial que actualizamos antes (@lucide/vue)
// GraduationCap = Sombrero de graduación, Wallet = Billetera, PiggyBank = Alcancía
import { GraduationCap, Wallet, PiggyBank } from 'lucide-vue-next'
import { ref } from 'vue'

const services = ref([
  {
    title: 'Cuenta Universitaria',
    description: 'Sin costo de mantenimiento. Tu dinero siempre disponible para lo que necesites.',
    icon: GraduationCap,
  },
  {
    title: 'Crédito Educativo',
    description: 'Financia tu matrícula, materiales o equipos tecnológicos con las mejores tasas del mercado.',
    icon: Wallet,
  },
  {
    title: 'Ahorro Programado',
    description: 'Organiza tus finanzas paso a paso y alcanza tus metas universitarias fácilmente.',
    icon: PiggyBank,
  },
])
</script>

<style scoped>
/* No requiere estilos adicionales ya que todo se maneja de forma óptima con Tailwind CSS */
</style>