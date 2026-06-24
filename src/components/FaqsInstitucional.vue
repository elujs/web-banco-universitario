<template>
  <section id="faqs-seccion" class="py-24 bg-white font-sans">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#030213] tracking-tight mb-4">
          Preguntas frecuentes
        </h2>
        <div class="h-1 w-20 bg-[#085F63] mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        
        <div class="space-y-4 w-full">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-gray-50/60 rounded-[24px] border border-gray-100/80 overflow-hidden transition-all duration-300"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left font-sans font-bold text-gray-900 text-base hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <span class="pr-4">{{ faq.pregunta }}</span>
              <ChevronDown 
                :size="18" 
                class="transform transition-transform duration-300 shrink-0 text-[#085F63]"
                :class="{ 'rotate-180': activeIndex === index }"
              />
            </button>

            <div 
              class="transition-all duration-300 ease-in-out overflow-hidden"
              :style="{ maxHeight: activeIndex === index ? '200px' : '0px' }"
            >
              <div class="px-6 pb-6 text-gray-500 text-sm md:text-base leading-relaxed border-t border-gray-200/40 pt-4">
                {{ faq.respuesta }}
              </div>
            </div>
          </div>
        </div>

        <div class="relative w-full">
          <div class="relative rounded-[32px] overflow-hidden shadow-xl border border-gray-100 h-[420px]">
            
            <div 
              v-for="(slide, index) in slides" 
              :key="index"
              class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
            >
              <img 
                :src="slide.src" 
                :alt="slide.alt" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
            </div>

            <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              <button 
                v-for="(_, index) in slides" 
                :key="index"
                @click="goToSlide(index)"
                class="h-2 rounded-full transition-all duration-300 focus:outline-none"
                :class="currentSlide === index ? 'w-6 bg-[#085F63]' : 'w-2 bg-white/60 hover:bg-white'"
              ></button>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

// --- LÓGICA DE LAS FAQS ---
const activeIndex = ref(-1)
const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

const faqs = ref([
  {
    pregunta: '¿Cuáles son los requisitos para abrir una cuenta?',
    respuesta: 'Para abrir tu cuenta solo necesitas ser estudiante activo o personal de la universidad asociada, presentar tu documento de identidad vigente y tu carnet universitario o constancia de inscripción.'
  },
  {
    pregunta: '¿Tiene algún costo de mantenimiento la cuenta?',
    respuesta: 'No, la cuenta de Banco Universitario está completamente libre de comisiones por manejo de cuenta, saldos mínimos o mantenimiento mensual.'
  },
  {
    pregunta: '¿Cómo puedo realizar depósitos en mi cuenta?',
    respuesta: 'Puedes realizar depósitos en efectivo en cualquiera de nuestras sucursales físicas habilitadas, puntos de atención autorizados o mediante transferencias interbancarias directas.'
  },
  {
    pregunta: '¿Qué hago si pierdo mi tarjeta?',
    respuesta: 'En caso de pérdida o robo, puedes bloquear tu tarjeta de inmediato desde nuestra aplicación móvil o comunicarte directamente a nuestra línea de atención al cliente para solicitar una reposición segura.'
  }
])

// --- LÓGICA DEL CARRUSEL AUTOMÁTICO (10 Segundos) ---
const currentSlide = ref(0)
let carruselTimer = null

const slides = ref([
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1080&auto=format&fit=crop',
    alt: 'Estudiantes universitarios en el campus'
  },
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1080&auto=format&fit=crop',
    alt: 'Sesión de colaboración en biblioteca'
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1080&auto=format&fit=crop',
    alt: 'Fachada universitaria y ambiente académico'
  }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetTimer()
}

const startTimer = () => {
  carruselTimer = setInterval(nextSlide, 3500) // Cambia cada 10 segundos
}

const resetTimer = () => {
  clearInterval(carruselTimer)
  startTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(carruselTimer)
})
</script>