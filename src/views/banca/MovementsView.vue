<script setup>
import { ref, onMounted } from 'vue';
import { getMovements } from '@/services/movementService';
import MovementFilters from '@/components/banca/movements/MovementFilters.vue';
import MovementTable from '@/components/banca/movements/MovementTable.vue';

// Referencia reactiva para almacenar los movimientos
const movements = ref([]);

// Función para cargar los datos desde la API
const loadMovements = async () => {
    try {
        const { data } = await getMovements();
        // Asignamos el array de datos que viene del backend
        movements.value = data.data; 
    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    }
};

onMounted(loadMovements);
</script>

<template>
    <div class="p-6 lg:p-8 max-w-7xl mx-auto">
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-1">Movements</h1>
            <p class="text-gray-500 text-sm">Full transaction history filtered by date range and type.</p>
        </div>

        <MovementFilters />

        <MovementTable :movements="movements" />
    </div>
</template>