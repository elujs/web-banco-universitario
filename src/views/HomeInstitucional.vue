<template>
  <div class="font-sans text-gray-900 flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <Aliados />
      <Servicios />
      <SolucionesFinancieras />
      <Nosotros />
      <EducationCenter />
      <FaqsInstitucional />
      <Contacto />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/landing/Navbar.vue'
import Hero from '@/components/landing/Hero.vue'
import Aliados from '@/components/landing/Aliados.vue'
import Servicios from '@/components/landing/Servicios.vue'
import SolucionesFinancieras from '@/components/landing/SolucionesFinancieras.vue'
import Nosotros from '@/components/landing/Nosotros.vue'
import EducationCenter from '@/components/landing/Educationcenter.vue'
import FaqsInstitucional from '@/components/landing/FaqsInstitucional.vue'
import Contacto from '@/components/landing/Contacto.vue'
import Footer from '@/components/landing/Footer.vue'
</script>
