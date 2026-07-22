<script setup>
import { ref, onMounted } from 'vue'
import { getMovements } from '@/services/movementService'
import AppHeader from '@/components/layout/AppHeader.vue'
import MovementFilters from '@/components/banca/movements/MovementFilters.vue'
import MovementTable from '@/components/banca/movements/MovementTable.vue'
import MovementModal from '@/components/banca/movements/MovementModal.vue'
import Selector from '@/components/layout/selector.vue'

// Variables de estado
const movements = ref([])
const totalItems = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const currentFilters = ref({})
const isLoading = ref(false)

// Variables para el modal
const isModalOpen = ref(false)
const selectedMovement = ref(null)

// Función central para cargar datos de la API de forma correcta
const loadMovements = async () => {
  isLoading.value = true
  try {
    const params = {}
    if (currentFilters.value.multiplier) {
      params.multiplier = currentFilters.value.multiplier
    }

    const response = await getMovements(currentPage.value, pageSize.value, params)
    
    // Inspeccionamos de dónde vienen los datos dependiendo de cómo los devuelva el backend
    const responseData = response.data?.data || response.data || []
    movements.value = Array.isArray(responseData) ? responseData : (responseData.items || [])

    // Intentamos capturar el total real del backend de cualquier propiedad estándar,
    // si la API no lo trae, estimamos el total basándonos en si la página actual está llena.
    const apiTotal = response.data?.total || response.data?.count || responseData.total || 0
    
    if (apiTotal > 0) {
      totalItems.value = apiTotal
    } else {
      // Si el backend no manda un "total" global, calculamos de forma inteligente:
      if (movements.value.length === pageSize.value) {
        totalItems.value = (currentPage.value * pageSize.value) + 1 
      } else {
        totalItems.value = ((currentPage.value - 1) * pageSize.value) + movements.value.length
      }
    }
  } catch (error) {
    console.error('Error al cargar movimientos:', error)
  } finally {
    isLoading.value = false
  }
}

// Manejadores
const handleFilters = (newFilters) => {
  currentFilters.value = newFilters
  pageSize.value = newFilters.pageSize
  currentPage.value = 1 // Reiniciamos a la página 1 al cambiar filtros
  loadMovements()
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  loadMovements()
}

const handleRowClick = (movement) => {
  selectedMovement.value = movement
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedMovement.value = null
  }, 300)
}

onMounted(async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
    return
  }

  await loadMovements()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <div class="flex-1 space-y-6">
          <!-- Título rediseñado con tarjeta, icono y acento turquesa -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085F63]/10 text-[#085F63]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-900">
                  Historial de <span class="text-[#085F63]">Movimientos</span>
                </h1>
                <p class="text-xs font-medium text-slate-400 mt-0.5">
                  Consulta detallada de todas las transacciones de tu cuenta en tiempo real.
                </p>
              </div>
            </div>
          </div>

          <!-- Filtros -->
          <MovementFilters @apply-filters="handleFilters" />

          <!-- Estado de carga -->
          <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#085F63]"></div>
            <span class="ml-3 text-slate-400 text-sm font-medium">Cargando movimientos...</span>
          </div>

          <!-- Tabla de movimientos -->
          <div v-else>
            <MovementTable
              :movements="movements"
              :current-page="currentPage"
              :page-size="pageSize"
              :total-items="totalItems"
              @change-page="handlePageChange"
              @row-click="handleRowClick"
            />
          </div>
        </div>
      </div>

      <MovementModal
        :is-open="isModalOpen"
        :movement="selectedMovement"
        @close="handleCloseModal"
      />
    </div>
  </div>
</template>
```[cite: 7]