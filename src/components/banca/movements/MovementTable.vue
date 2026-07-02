<script setup>
// 1. IMPORTANTE: Esto es lo que le dice a Vue que vamos a recibir los datos desde afuera
defineProps({
    movements: {
        type: Array,
        required: true,
        default: () => [] // Si no hay datos, ponemos un arreglo vacío para que no explote
    }
});

// 2. Funciones de formato visual
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};
</script>

<template>
    <div class="overflow-x-auto mt-8">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th class="px-4 py-4">ID</th>
                    <th class="px-4 py-4">Descripcion</th>
                    <th class="px-4 py-4">Fecha y hora</th>
                    <th class="px-4 py-4 text-right">Monto</th>
                    <th class="px-4 py-4 text-right">Balance final</th>
                </tr>
            </thead>
            
            <tbody class="text-sm text-gray-700">
                <tr v-for="movement in movements" :key="movement.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    
                    <td class="px-4 py-4 text-gray-400">
                        #{{ movement.id }}
                    </td>
                    
                    <td class="px-4 py-4 font-medium text-gray-900">
                        {{ movement.description }}
                    </td>
                    
                    <td class="px-4 py-4 text-gray-500">
                        {{ formatDate(movement.created_at) }}
                    </td>

                    <td class="px-4 py-4 text-right" :class="movement.multiplier === 1 ? 'text-income' : 'text-expense'">
                        <span v-if="movement.multiplier === 1">+</span>
                        <span v-else>-</span>
                        {{ formatCurrency(movement.amount) }}
                    </td>
                    
                    <td class="px-4 py-4 text-right text-gray-500">
                        {{ formatCurrency(movement.balance) }}
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* Colores dinámicos */
.text-income {
    color: #10B981; 
    font-weight: 600;
}

.text-expense {
    color: #111827;
    font-weight: 600;
}
</style>