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
import { Landmark, CreditCard, Wallet, FileText, Headphones } from 'lucide-vue-next'
import { ref } from 'vue'

const services = ref([
  {
    title: 'Cuentas',
    description:
      'Apertura y gestión de cuentas corrientes y de ahorro para estudiantes y para el personal universitario .',
    icon: Landmark,
  },
  {
    title: 'Depósitos en efectivo',
    description:
      'El Banco Universitario permite a los estudiantes realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales. ',
    icon: CreditCard,
  },

  {
    title: 'Retiros en efectivo',
    description:
      'El Banco Universitario también permite a los estudiantes realizar retiros en efectivo de manera rápida y segura. Los estudiantes pueden realizar retiros en cualquiera de las sucursales del banco.',
    icon: Wallet,
  },

  {
    title: 'Transferencias entre estudiantes sin comision',
    description: 'El Banco Universitario ofrece un servicio de transferencias entre estudiantes sin costo alguno. ',
    icon: FileText,
  },

  {
    title: 'Pago de matrícula estudiantil',
    description: 'El Banco Universitario ofrece un servicio de pago de matrícula estudiantil, que permite a los estudiantes universitarios pagar sus matrículas de manera rápida y sencilla.',
    icon: FileText,
  },

  {
    title: 'Cobro de becas estudiantiles',
    description: 'El Banco Universitario permite a los estudiantes universitarios cobrar sus becas estudiantiles de manera sencilla y eficiente.',
    icon: FileText,
  },

  
])
</script>

<style scoped></style>
