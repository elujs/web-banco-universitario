<template>
  <div class="font-sans text-gray-900">
    <Navbar />
    <main>
      <hero />
      <Servicios />
      <Nosotros />
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Servicios from '@/components/Servicios.vue';
import Hero from '@/components/hero.vue';
import Nosotros from '@/components/Nosotros.vue';
</script>

