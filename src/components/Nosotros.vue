<template>
  <section id="nosotros" class="py-16 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#085F63]">
          Nosotros
        </p>
        <h2 class="text-3xl md:text-4xl font-bold font-alternates text-gray-900 mt-3">
          Todo lo que necesitas saber sobre nuestro banco universitario
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto mt-4">
          Conoce nuestra misión, visión y objetivos como banco universitario comprometido con la comunidad.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="group p-8 bg-white rounded-3xl border border-gray-200 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          @mouseenter="hovered = index"
          @mouseleave="hovered = null"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ card.title }}</h3>

          <div
            class="overflow-hidden transition-all duration-300"
            :class="hovered === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'"
          >
            <p v-if="card.text" class="text-gray-600 leading-relaxed">
              {{ card.text }}
            </p>

            <ul v-if="card.list" class="mt-4 space-y-3 text-gray-600 list-disc list-inside">
              <li v-for="(item, itemIndex) in card.list" :key="itemIndex">
                {{ item }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hovered = ref(null)

const cards = [
  {
    title: 'Misión',
    text:
      'Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y pernal de nuestros clientes.',
  },
  {
    title: 'Visión',
    text:
      'Queremos ser la principal opción financiera para estudiantes universitarios en el país, Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.'
  },
  {
    title: 'Objetivos',
    list: [
      'Brindar a los estudiantes universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de nuestros canales digitales y nuestros puntos de atención presencial.',
      'Fomentar el uso de nuestras plataformas digitales para hacer transferencias entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo herramientas tecnológicas fáciles y seguras.',
      'Promover la educación financiera de los estudiantes universitarios, a través de charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el uso responsable del crédito',   
      'Establecer alianzas estratégicas con universidades y empresas para ofrecer beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas, becas, prácticas laborales, entre otros.',
      'Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado.',
    ],
  },
]
</script>

<style scoped>
/* Si deseas, agrega estilos extra aquí */
</style>