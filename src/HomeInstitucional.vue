<template>
  <div class="font-sans text-gray-900 flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <Aliados />
      <Servicios />
      <Nosotros />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/hero.vue'
import Aliados from '@/components/Aliados.vue'
import Servicios from '@/components/Servicios.vue'
import Nosotros from '@/components/Nosotros.vue'
import Footer from '@/components/Footer.vue'
</script>
