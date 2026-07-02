<script setup>
import { ref, onMounted } from 'vue';
// Importamos tus componentes actuales
import MovementFilters from '@/components/banca/movements/MovementFilters.vue';
import MovementTable from '@/components/banca/movements/MovementTable.vue';
// Importamos la función de servicio que creamos
import { getMovements } from '@/services/movementService';

const movements = ref([]);

onMounted(async () => {
    try {
        // Llamamos al backend y guardamos el resultado
        const { data } = await getMovements();
        movements.value = data.data; 
    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    }
});
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