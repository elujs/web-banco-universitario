<script setup>
// Importamos los componentes siguiendo tu estructura de carpetas
import MovementFilters from '@/components/banca/movements/MovementFilters.vue'
import MovementTable from '@/components/banca/movements/MovementTable.vue'
</script>

<template>
  <div class="p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Encabezado idéntico al diseño -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-1">Movements</h1>
      <p class="text-gray-500 text-sm">Full transaction history filtered by date range and type.</p>
    </div>

    <!-- Zona de Filtros -->
    <MovementFilters />

    <!-- Zona de la Tabla -->
    <MovementTable />
  </div>
</template>