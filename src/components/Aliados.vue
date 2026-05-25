<template>
  <section class="bg-[#f8f9fa] py-12 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6 text-center">
      
      <h3 class="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-8">
        Aliados Universitarios
      </h3>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-center justify-center">
        <div 
          v-for="aliado in aliados" 
          :key="aliado.nombre" 
          class="flex flex-col items-center justify-center gap-3 group"
        >
          <div class="w-16 h-16 bg-white rounded-xl border border-gray-200/60 shadow-sm flex items-center justify-center text-gray-400 font-bold text-lg tracking-tighter transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md">
            {{ aliado.siglas }}
          </div>
          
          <span class="text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-gray-600">
            {{ aliado.nombre }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const aliados = ref([
  { siglas: 'un', nombre: 'Universidad Nacional' },
  { siglas: 'uc', nombre: 'Universidad Central' },
  { siglas: 'IT', nombre: 'Instituto Tecnológico' },
  { siglas: 'ua', nombre: 'Universidad Autónoma' }
])
</script>

<style scoped>
/* No requiere estilos manuales */
</style>