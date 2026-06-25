<template>
  <section id="soluciones" class="py-20 bg-gray-50 font-sans">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#085F63] mb-4 tracking-tight">
          Soluciones financieras ágiles y eficientes
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
          Todo lo que necesitas para administrar tus finanzas universitarias en un solo lugar
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <article
          v-for="solucion in soluciones"
          :key="solucion.title"
          class="bg-white rounded-[32px] p-10 border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
        >
          <div class="text-[#085F63] mb-8">
            <component :is="solucion.icon" :size="48" stroke-width="1.5" />
          </div>

          <h3 class="text-2xl font-bold text-gray-900 mb-5 leading-tight">
            {{ solucion.title }}
          </h3>
          <p class="text-gray-500 text-base leading-relaxed">
            {{ solucion.description }}
          </p>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ArrowLeftRight, GraduationCap, BadgePercent } from 'lucide-vue-next'
import { ref } from 'vue'

const soluciones = ref([
  {
    title: 'Transferencias sin comisión',
    description: 'Envía dinero a otros estudiantes o a cualquier cuenta sin pagar comisiones. Instantáneo y seguro.',
    icon: ArrowLeftRight,
  },
  {
    title: 'Pago de matrícula',
    description: 'Paga tu matrícula directamente desde la app con recordatorios automáticos y facilidades de pago.',
    icon: GraduationCap,
  },
  {
    title: 'Cobro de becas',
    description: 'Recibe tus becas de forma automática sin trámites complicados. Depósito directo y sin demoras.',
    icon: BadgePercent,
  }
])
</script>