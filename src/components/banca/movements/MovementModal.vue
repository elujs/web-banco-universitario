<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: { type: Boolean, default: false },
    movement: { type: Object, default: null }
});

const emit = defineEmits(['close']);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Función para limpiar la fecha larga y mostrarla legible
const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    // Toma solo la parte de la fecha antes de la 'T'
    return dateString.split('T')[0];
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
        <div class="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 relative">
            
            <button @click="emit('close')" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>

            <div v-if="movement" class="flex flex-col items-center">
                
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <svg v-if="movement.multiplier === 1" class="w-10 h-10 text-[#085F63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                    </svg>
                    <svg v-else class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                    </svg>
                </div>
                
                <p class="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">
                    {{ movement.multiplier === 1 ? 'CRÉDITO' : 'DÉBITO' }}
                </p>

                <h2 class="text-4xl font-bold text-gray-900 mb-10">
                    {{ movement.multiplier === 1 ? '+' : '-' }}{{ formatCurrency(movement.amount) }}
                </h2>

                <div class="w-full space-y-6">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">ID de la Transacción</span>
                        <span class="font-bold text-gray-900">{{ movement.id }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Cuenta Asociada</span>
                        <span class="font-bold text-gray-900">{{ movement.account_number }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Concepto / Descripción</span>
                        <span class="font-bold text-gray-900">{{ movement.description }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Fecha de creación</span>
                        <span class="font-bold text-gray-900">{{ formatDisplayDate(movement.created_at) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Resultado</span>
                        <span class="font-bold text-gray-900">{{ formatCurrency(movement.balance) }}</span>
                    </div>
                </div>

                <button @click="emit('close')" class="w-full mt-10 py-4 bg-[#085F63] text-white rounded-2xl font-bold hover:bg-[#064a4d] transition-all">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</template>