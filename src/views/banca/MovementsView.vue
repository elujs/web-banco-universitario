<script setup>
import { ref, onMounted } from 'vue';
import { getMovements } from '@/services/movementService';
import MovementFilters from '@/components/banca/movements/MovementFilters.vue';
import MovementTable from '@/components/banca/movements/MovementTable.vue';
import MovementModal from '@/components/banca/movements/MovementModal.vue';

// Variables que controlan toda la pantalla
const movements = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);
const currentFilters = ref({});

// Variables para el modal
const isModalOpen = ref(false);
const selectedMovement = ref(null);

// Función central que busca los datos
const loadMovements = async () => {
    try {
        const { data } = await getMovements(currentPage.value, pageSize.value, currentFilters.value);
        movements.value = data.data || [];
        totalItems.value = data.total || movements.value.length || 0; 
    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    }
};

// Escucha cuando el usuario presiona "Aplicar filtros"
const handleFilters = (newFilters) => {
    currentFilters.value = newFilters;
    pageSize.value = newFilters.pageSize;
    currentPage.value = 1; // Al filtrar, siempre empezamos desde la primera página
    loadMovements();
};

// Escucha cuando el usuario toca las flechas en la tabla
const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    loadMovements();
};

// Escucha cuando el usuario hace clic en una fila de la tabla
const handleRowClick = (movement) => {
    selectedMovement.value = movement;
    isModalOpen.value = true;
};

// Escucha cuando el usuario cierra el modal
const handleCloseModal = () => {
    isModalOpen.value = false;
    setTimeout(() => { selectedMovement.value = null; }, 300); // Pequeño retraso para que la animación de cierre se vea suave
};

onMounted(async () => {
    // Token temporal para pruebas locales
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3R5cGUiOiJjbGllbnQifQ.dznytO5M8cU-23bXGwu1EcO3kL2ZolJuKhw_GY2k_4Q');
    await loadMovements();
});
</script>

<template>
    <div class="p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Movimientos</h1>
        
        <MovementFilters @apply-filters="handleFilters" />
        
        <MovementTable 
            :movements="movements" 
            :current-page="currentPage"
            :page-size="pageSize"
            :total-items="totalItems"
            @change-page="handlePageChange"
            @row-click="handleRowClick"
        />

        <MovementModal 
            :is-open="isModalOpen" 
            :movement="selectedMovement" 
            @close="handleCloseModal" 
        />
    </div>
</template>