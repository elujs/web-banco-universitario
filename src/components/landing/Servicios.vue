<template>
  <section id="servicios" class="py-24 bg-white font-sans">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#030213] tracking-tight mb-4">
          Nuestros servicios operacionales
        </h2>
        <div class="h-1 w-20 bg-[#085F63] mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <article
          v-for="service in baseServices"
          :key="service.title"
          class="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_10px_30px_rgba(3,2,19,0.04)] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(3,2,19,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#085F63]/5 to-transparent rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-110"></div>

          <div>
            <div class="bg-[#044347] text-white p-4 rounded-2xl inline-flex items-center justify-center mb-6 shadow-md shadow-[#044347]/10">
              <component :is="service.icon" :size="28" stroke-width="2" />
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              {{ service.title }}
            </h3>

            <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
              {{ service.description }}
            </p>
          </div>

          <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-[#085F63] uppercase tracking-wider">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {{ service.badge }}
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ArrowUpRight, ArrowDownLeft } from 'lucide-vue-next'
import { ref } from 'vue'

const baseServices = ref([
  {
    title: 'Depósitos en efectivo',
    description: 'El Banco Universitario permite a los estudiantes realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales. Este servicio está disponible las 24 horas del día, los 7 días de la semana, lo que permite a los estudiantes realizar sus depósitos en cualquier momento que lo necesiten.',
    icon: ArrowDownLeft, // Icono dinámico que simula entrada de dinero
    badge: 'Disponible 24/7'
  },
  {
    title: 'Retiros en efectivo',
    description: 'El Banco Universitario también permite a los estudiantes realizar retiros en efectivo de manera rápida y segura. Los estudiantes pueden realizar retiros en cualquiera de las sucursales del banco, con la tranquilidad de que sus fondos están seguros y protegidos.',
    icon: ArrowUpRight, // Icono dinámico que simula salida de dinero
    badge: 'Seguridad Garantizada'
  }
])
</script>

<style scoped>
/* Animaciones y transiciones fluidas controladas por Tailwind */
</style>