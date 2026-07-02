<script setup>
import { ref, onMounted } from 'vue';
import { getMovements } from '@/services/movementService';
import MovementFilters from '@/components/banca/movements/MovementFilters.vue';
import MovementTable from '@/components/banca/movements/MovementTable.vue';

const movements = ref([]);

const loadMovements = async () => {
    try {
        const { data } = await getMovements();
        movements.value = data.data;
    } catch (error) {
        console.error("Error al cargar movimientos:", error);
    }
};

onMounted(async () => {
    // Tu token temporal para que funcione (luego lo pondremos dinámico)
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3R5cGUiOiJjbGllbnQifQ.dznytO5M8cU-23bXGwu1EcO3kL2ZolJuKhw_GY2k_4Q');
    await loadMovements();
});
</script>

<template>
    <div class="p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Movimientos</h1>
        <MovementFilters />
        <MovementTable :movements="movements" />
    </div>
</template>