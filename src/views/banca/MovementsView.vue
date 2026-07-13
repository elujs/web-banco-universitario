<script setup>
import { ref, onMounted } from 'vue';
import { getMovements } from '@/services/movementService';
import AppHeader from '@/components/layout/AppHeader.vue'; 
import MovementFilters from '@/components/banca/movements/MovementFilters.vue';
import MovementTable from '@/components/banca/movements/MovementTable.vue';
import MovementModal from '@/components/banca/movements/MovementModal.vue';

// Variables de estado
const movements = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);
const currentFilters = ref({});
const isLoading = ref(false); // Variable de control de carga

// Variables para el modal
const isModalOpen = ref(false);
const selectedMovement = ref(null);

// Función central para cargar datos
const loadMovements = async () => {
    isLoading.value = true; // 1. Activamos el spinner
    try {
        const { data } = await getMovements(currentPage.value, pageSize.value, {}); 
        
        let movementsList = data.data || [];

        // Filtro local
        if (currentFilters.value.fromDate) {
            movementsList = movementsList.filter(m => m.created_at >= currentFilters.value.fromDate);
        }
        if (currentFilters.value.toDate) {
            movementsList = movementsList.filter(m => m.created_at <= currentFilters.value.toDate);
        }
        if (currentFilters.value.multiplier) {
            movementsList = movementsList.filter(m => m.multiplier == currentFilters.value.multiplier);
        }

        movements.value = movementsList;
        totalItems.value = data.total || movementsList.length || 0; 
    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    } finally {
        isLoading.value = false; // 2. Desactivamos el spinner pase lo que pase
    }
};

// Manejadores
const handleFilters = (newFilters) => {
    currentFilters.value = newFilters;
    pageSize.value = newFilters.pageSize;
    currentPage.value = 1;
    loadMovements();
};

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    loadMovements();
};

const handleRowClick = (movement) => {
    selectedMovement.value = movement;
    isModalOpen.value = true;
};

const handleCloseModal = () => {
    isModalOpen.value = false;
    setTimeout(() => { selectedMovement.value = null; }, 300);
};

onMounted(async () => {
    await loadMovements();
});

</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <AppHeader />

      <div>
        <h1 class="text-3xl font-bold text-gray-900">Movimientos</h1>
        <p class="text-gray-500">Historial completo de transacciones filtrado por rango de fechas y tipo.</p>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <MovementFilters @apply-filters="handleFilters" />
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#085F63]"></div>
          <span class="ml-3 text-gray-500">Cargando movimientos...</span>
      </div>

      <div v-else class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <MovementTable 
            :movements="movements" 
            :current-page="currentPage"
            :page-size="pageSize"
            :total-items="totalItems"
            @change-page="handlePageChange"
            @row-click="handleRowClick"
        />
      </div>

      <MovementModal 
            :is-open="isModalOpen" 
            :movement="selectedMovement" 
            @close="handleCloseModal" 
      />
    </div>
  </div>
</template>