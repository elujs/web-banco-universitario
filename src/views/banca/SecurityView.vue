<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import Selector from '@/components/layout/selector.vue'
import SecurityCard from '@/components/banca/security/SecurityCard.vue'

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <div class="flex-1 space-y-6 flex flex-col">
          <!-- Encabezado con tarjeta e icono -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085F63]/10 text-[#085F63]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-900">
                  Apartado de <span class="text-[#085F63]">Seguridad</span>
                </h1>
                <p class="text-xs font-medium text-slate-400 mt-0.5">
                  Gestiona y actualiza las credenciales de seguridad de tu cuenta.
                </p>
              </div>
            </div>
          </div>

          <!-- Contenedor centrado para el formulario -->
          <div class="flex-1 flex justify-center items-center py-4">
            <SecurityCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>