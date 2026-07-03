<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: { type: Boolean, default: false },
    movement: { type: Object, default: null }
});

const emit = defineEmits(['close']);

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
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity">
        
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div v-if="movement" class="p-6">
                
                <div class="text-center mb-6">
                    <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {{ movement.multiplier === 1 ? 'Crédito' : 'Débito' }}
                    </p>
                    <h2 class="text-3xl font-bold" :class="movement.multiplier === 1 ? 'text-[#10B981]' : 'text-gray-900'">
                        <span v-if="movement.multiplier === 1">+</span>
                        <span v-else>-</span>
                        {{ formatCurrency(movement.amount) }}
                    </h2>
                </div>

                <div class="space-y-4 text-sm">
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                        <span class="text-gray-500">ID de Transacción</span>
                        <span class="font-medium text-gray-900">{{ movement.id }}</span>
                    </div>
                    
                    <div class="flex justify-between border-b border-gray-100 pb-2">
                        <span class="text-gray-500">Cuenta Asociada</span>
                        <span class="font-medium text-gray-900">{{ movement.account_number }}</span>
                    </div>

                    <div class="flex justify-between border-b border-gray-100 pb-2">
                        <span class="text-gray-500">Concepto</span>
                        <span class="font-medium text-gray-900">{{ movement.description }}</span>
                    </div>

                    <div class="flex justify-between border-b border-gray-100 pb-2">
                        <span class="text-gray-500">Fecha de Creación</span>
                        <span class="font-medium text-gray-900">{{ formatDate(movement.created_at) }}</span>
                    </div>

                    <div class="flex justify-between border-b border-gray-100 pb-2">
                        <span class="text-gray-500">Balance Resultante</span>
                        <span class="font-medium text-gray-900">{{ formatCurrency(movement.balance) }}</span>
                    </div>
                </div>

                <div class="mt-8">
                    <button @click="emit('close')" class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        Cerrar Detalles
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>