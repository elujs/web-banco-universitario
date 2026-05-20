<template>
  <section id="servicios" class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Nuestros servicios</h2>
      <p class="text-gray-600 mb-8"></p>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-[#085F63] text-white rounded-lg">
              <component :is="service.icon" :size="20" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ service.title }}</h3>
          </div>
          <p class="text-gray-600 text-sm">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Bank, CreditCard, Wallet, FileText, Headphones } from 'lucide-vue-next'
import { ref } from 'vue'

const services = ref([
  {
    title: 'Cuentas',
    description: 'Apertura y gestión de cuentas corrientes y de ahorro para estudiantes y personal.',
    icon: Bank,
  },
  {
    title: 'Créditos',
    description: 'Créditos estudiantiles y par el personal universitario con condiciones especiales para la comunidad universitaria.',
    icon: CreditCard,
  },

  {
    title: 'Ahorros',
    description: 'Programas de ahorro diseñados para estudiantes y personal universitario, con beneficios exclusivos.',
    icon: Wallet,
  },

  {
    title: 'Transferencias',
    description: 'Transferencias instantáneas.',
    icon: FileText,
  },

  {
    title: 'Pagos',
    description: 'Pagos de matrícula directamente desde la app.',
    icon: FileText,
  },

  {
    title: 'cobro de becas',
    description: 'cobro de becas directamente desde la app.',
    icon: FileText,
  },
 
  {
    title: 'Atención al cliente',
    description: 'numeros de atencion al cliente y resolucion de dudas.',
    icon: Headphones,
  },
])
</script>

<style scoped>
</style>