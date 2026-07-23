<script setup>
import { computed } from 'vue';

const props = defineProps({
    movements: { type: Array, required: true, default: () => [] },
    totalItems: { type: Number, default: 0 },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 }
});

const emit = defineEmits(['change-page', 'row-click']);

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

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize) || 1);

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        emit('change-page', page);
    }
};
</script>

<template>
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100">
                        <th class="px-6 py-4">ID</th>
                        <th class="px-6 py-4">Descripción</th>
                        <th class="px-6 py-4">Fecha y hora</th>
                        <th class="px-6 py-4 text-right">Monto</th>
                        <th class="px-6 py-4 text-right">Balance final</th>
                    </tr>
                </thead>
                
                <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                    <tr v-if="movements.length === 0">
                        <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                            No hay transacciones registradas en este periodo.
                        </td>
                    </tr>
                    
                    <tr v-for="movement in movements" :key="movement.id" 
                        @click="emit('row-click', movement)"
                        class="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                        
                        <td class="px-6 py-4 font-mono text-xs text-slate-400">
                            #{{ movement.id }}
                        </td>
                        
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3.5">
                                <!-- Contenedor del icono con condicional de color idéntico al dashboard -->
                                <div 
                                    class="flex h-10 w-10 items-center justify-center rounded-2xl shrink-0 transition-transform group-hover:scale-105"
                                    :class="movement.multiplier === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'"
                                >
                                    <!-- Flecha hacia arriba (Crédito) -->
                                    <svg v-if="movement.multiplier === 1" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-6v12" />
                                    </svg>
                                    <!-- Flecha hacia abajo (Débito) -->
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 6V6" />
                                    </svg>
                                </div>
                                <span class="font-semibold text-slate-900">{{ movement.description }}</span>
                            </div>
                        </td>
                        
                        <td class="px-6 py-4 text-xs text-slate-500 font-medium">
                            {{ formatDate(movement.created_at) }}
                        </td>

                        <td class="px-6 py-4 text-right font-bold" :class="movement.multiplier === 1 ? 'text-emerald-600' : 'text-slate-900'">
                            <span v-if="movement.multiplier === 1">+</span>
                            <span v-else>-</span>
                            {{ formatCurrency(movement.amount) }}
                        </td>
                        
                        <td class="px-6 py-4 text-right text-xs font-medium text-slate-400">
                            {{ formatCurrency(movement.balance) }}
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Paginación inferior estilizada -->
       <div class="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-100">
            <span class="text-xs font-medium text-slate-400">
               Mostrando <span class="text-slate-700 font-bold">{{ movements.length }}</span> resultados
            </span>
            
            <div class="flex items-center space-x-1.5">
                <!-- Botón flecha izquierda -->
                <button 
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                
                <!-- Número de la página en la que te encuentras -->
                <div class="px-3.5 h-8 flex items-center justify-center rounded-xl bg-[#085F63] text-white text-xs font-bold shadow-sm">
                    {{ currentPage }}
                </div>
                
                <!-- Botón flecha derecha -->
                <button 
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage >= totalPages"
                    class="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>