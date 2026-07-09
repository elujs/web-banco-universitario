<template>
  <!-- Franja blanca con sombra sutil -->
  <header class="bg-white px-8 py-6 rounded-xl border border-gray-100 shadow-sm mb-8 flex justify-between items-center">
    
    <!-- Bloque de bienvenida -->
    <div>
      <h1 class="text-2xl font-bold text-gray-800">
        <!-- Nombre en verde según tu diseño -->
        <span class=text-[#085F63]>¡Hola, {{ userName }}!</span> 
        <span class="font-normal text-gray-500"> Bienvenido a tu Banca en Línea.</span>
      </h1>
    </div>

    <!-- Espacio para notificaciones o perfil (como en tu imagen) -->
    <div class="flex items-center gap-4">
      <div class="text-gray-400">🔔</div>
      <div class="bg-[#085F63] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
        {{ initials }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

// Obtenemos el nombre del usuario
const userName = computed(() => localStorage.getItem('userName') || 'Jorge');

// Calculamos iniciales para el círculo (JC)
const initials = computed(() => {
  const name = userName.value;
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
});
</script>