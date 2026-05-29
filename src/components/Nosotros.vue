<template>
  <section id="nosotros" class="py-24 bg-white font-sans">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#030213] tracking-tight mb-4 font-sans">
          Nuestra Institución
        </h2>
        <div class="h-1 w-20 bg-[#085F63] mx-auto rounded-full"></div>
      </div>

      <div class="space-y-8 max-w-5xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <article class="bg-gray-50/60 rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between min-h-[320px]">
            <div>
              <div class="text-[#085F63] mb-6">
                <Target :size="40" stroke-width="1.5" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 font-sans">
                Misión
              </h3>
              <p class="text-gray-500 text-sm md:text-base leading-relaxed font-sans">
                Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.
              </p>
            </div>
          </article>

          <article class="bg-gray-50/60 rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between min-h-[320px]">
            <div>
              <div class="text-[#085F63] mb-6">
                <Eye :size="40" stroke-width="1.5" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 font-sans">
                Visión
              </h3>
              <p class="text-gray-500 text-sm md:text-base leading-relaxed font-sans">
                Queremos ser la principal opción financiera para estudiantes universitarios en el país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.
              </p>
            </div>
          </article>

        </div>

        <article class="bg-[#044347] rounded-[32px] p-8 md:p-10 text-white shadow-lg relative overflow-hidden group">
          <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full pointer-events-none"></div>
          
          <div class="flex flex-col md:flex-row gap-8 items-start relative z-10 w-full">
            
            <div class="md:w-1/4 shrink-0">
              <div class="text-white/90 mb-4 bg-white/10 p-4 rounded-2xl inline-flex items-center justify-center">
                <Compass :size="36" stroke-width="1.5" />
              </div>
              <h3 class="text-3xl font-bold font-sans tracking-tight">
                Objetivos
              </h3>
              <p class="text-emerald-300 text-xs font-semibold uppercase tracking-wider mt-2">
                Haz clic para expandir
              </p>
            </div>

            <div class="md:w-3/4 w-full space-y-3">
              <div 
                v-for="(objetivo, index) in objetivos" 
                :key="index"
                class="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all duration-300"
              >
                <button 
                  @click="toggleObjetivo(index)"
                  class="w-full flex items-center justify-between p-4 text-left font-sans font-bold text-sm md:text-base transition-colors hover:bg-white/10 focus:outline-none"
                >
                  <div class="flex items-start gap-3 pr-4">
                    <span class="text-emerald-400 font-bold">0{{ index + 1 }}.</span>
                    <span>{{ objetivo.title }}</span>
                  </div>
                  <ChevronDown 
                    :size="18" 
                    class="transform transition-transform duration-300 shrink-0 text-emerald-400"
                    :class="{ 'rotate-180': activeIndex === index }"
                  />
                </button>

                <div 
                  class="transition-all duration-300 ease-in-out overflow-hidden"
                  :style="{ maxHeight: activeIndex === index ? '200px' : '0px' }"
                >
                  <div class="p-4 pt-0 text-white/80 text-sm leading-relaxed border-t border-white/5 bg-black/10">
                    {{ objetivo.description }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Target, Eye, Compass, ChevronDown } from 'lucide-vue-next'

// Variable reactiva para controlar cuál desplegable está abierto (-1 significa todos cerrados)
const activeIndex = ref(-1)

const toggleObjetivo = (index) => {
  // Si el usuario hace clic en el que ya está abierto, se cierra. Si no, abre el nuevo.
  activeIndex.value = activeIndex.value === index ? -1 : index
}

// Estructura limpia dividiendo el título corto para el botón y el desglose completo
const objetivos = ref([
  {
    title: 'Servicio eficiente y de calidad',
    description: 'Brindar a los estudiantes universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de nuestros canales digitales y nuestros puntos de atención presencial.'
  },
  {
    title: 'Fomento de plataformas digitales libres de comisión',
    description: 'Fomentar el uso de nuestras plataformas digitales para hacer transferencias entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo herramientas tecnológicas fáciles y seguras.'
  },
  {
    title: 'Promoción de la educación financiera',
    description: 'Promover la educación financiera de los estudiantes universitarios, a través de charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el uso responsable del crédito.'
  },
  {
    title: 'Establecimiento de alianzas estratégicas',
    description: 'Establecer alianzas estratégicas con universidades y empresas para ofrecer beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas, becas, prácticas laborales, entre otros.'
  },
  {
    title: 'Cultura de innovación y mejora continua',
    description: 'Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado.'
  }
])
</script>