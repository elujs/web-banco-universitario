<template>
  <div class="font-sans text-gray-900 flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <Servicios />
      <Nosotros />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Servicios from '@/components/Servicios.vue'
import Hero from '@/components/Hero.vue'
import Nosotros from '@/components/Nosotros.vue'
import Footer from '@/components/Footer.vue'
</script>
