<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['apply-filters']);

const filters = ref({
  multiplier: '',
  pageSize: 20
});

// Cada vez que cambie cualquier filtro, emitimos los datos automáticamente
watch(filters, (newFilters) => {
  emit('apply-filters', { ...newFilters });
}, { deep: true });
</script>

<template>
  <div class="mb-8 p-6 bg-gradient-to-br from-[#085F63]/10 via-[#085F63]/5 to-transparent rounded-3xl border border-[#085F63]/20 shadow-sm relative overflow-hidden">
    <!-- Círculo decorativo de fondo para dar profundidad y color -->
    <div class="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#085F63]/10 blur-xl pointer-events-none"></div>

    <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <label class="block text-[11px] font-bold text-[#085F63] uppercase tracking-[0.2em] mb-2">Tipo de transacción</label>
        <select v-model="filters.multiplier" class="w-full px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-[#085F63]/30 rounded-2xl focus:border-[#085F63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#085F63]/20 transition-all cursor-pointer shadow-xs">
          <option value="">Todas las transacciones</option>
          <option value="1">Créditos (+)</option>
          <option value="-1">Débitos (-)</option>
        </select>
      </div>

      <div>
        <label class="block text-[11px] font-bold text-[#085F63] uppercase tracking-[0.2em] mb-2">Mostrar por página</label>
        <select v-model.number="filters.pageSize" class="w-full px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-[#085F63]/30 rounded-2xl focus:border-[#085F63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#085F63]/20 transition-all cursor-pointer shadow-xs">
          <option value="10">10 filas</option>
          <option value="20">20 filas</option>
          <option value="50">50 filas</option>
        </select>
      </div>

    </div>
  </div>
</template>