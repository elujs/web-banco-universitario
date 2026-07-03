<script setup>
import { ref } from 'vue';

// Le decimos a Vue que este componente puede emitir un evento llamado 'apply-filters'
const emit = defineEmits(['apply-filters']);

// Calculamos la fecha de hoy para bloquear el calendario (Ej: "2026-07-02")
const today = new Date().toISOString().split('T')[0];

// Estas variables reactivas atrapan lo que el usuario selecciona
const filters = ref({
  fromDate: '',
  toDate: '',
  multiplier: '',
  pageSize: 20
});

// Función que se ejecuta al darle clic al botón
const applyFilters = () => {
  emit('apply-filters', { ...filters.value });
};
</script>

<template>
  <div class="mb-6 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Desde</label>
        <input v-model="filters.fromDate" type="date" :max="today" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hasta</label>
        <input v-model="filters.toDate" type="date" :max="today" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo</label>
        <select v-model="filters.multiplier" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
          <option value="">Todas las transacciones</option>
          <option value="1">Créditos (+)</option>
          <option value="-1">Débitos (-)</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Por página</label>
        <select v-model.number="filters.pageSize" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
          <option value="10">10 filas</option>
          <option value="20">20 filas</option>
          <option value="50">50 filas</option>
        </select>
      </div>

    </div>

    <div class="mt-4">
      <button @click="applyFilters" class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
        Aplicar filtros
      </button>
    </div>
  </div>
</template>