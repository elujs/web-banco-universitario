<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
    <div
      class="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
    >
      <div
        class="w-20 h-20 bg-[#085F63]/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Clock class="text-[#085F63]" :size="40" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900">¡Banca en linea Próximamente!</h1>
      <p class="text-gray-600 text-lg">
        Nuestra Banca en Línea está en construcción. Muy pronto podrás gestionar todas tus finanzas
        desde aquí.
      </p>
      <button
        @click="$router.push('/')"
        class="mt-8 bg-[#085F63] hover:bg-[#0a7a7f] text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg font-semibold flex items-center justify-center mx-auto space-x-2"
      >
        <ArrowLeft :size="18" />
        <span>Volver al inicio</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Clock, ArrowLeft } from 'lucide-vue-next'
</script>
