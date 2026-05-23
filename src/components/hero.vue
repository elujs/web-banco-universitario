<template>
  <section
    id="inicio"
    class="min-h-screen pt-28 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
  >
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Tu banco universitario, <span class="text-[#085F63]">100% digital</span>
          </h1>
          <p class="text-gray-600 text-base md:text-lg max-w-xl">
            Gestiona tus finanzas de manera inteligente. Transferencias sin comisión, pagos de
            matrícula y más, todo desde tu smartphone.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              placeholder="Ingresa tu correo universitario"
              class="flex-1 px-5 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition-all shadow-sm"
            />
            <button
              class="bg-[#085F63] hover:bg-[#0a7a7f] text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <span class="font-semibold">Crear cuenta</span>
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>

        <div
          class="relative flex items-center justify-center bg-white rounded-[55px] h-[600px] w-full max-w-[320px] mx-auto border-[14px] border-gray-800 shadow-2xl overflow-hidden"
        >
          <div
            class="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-800 rounded-b-[20px] z-20"
          ></div>
          <img
            src="@/assets/dashboard-mockup.png"
            alt="Banca en línea"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>
