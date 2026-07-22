<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row mt-6">
        <Selector />

        <main class="flex-1 space-y-6">
          <!-- Tarjeta de Saldo Modular -->
          <BalanceCard />

          <!-- Listado de Movimientos Recientes Modular -->
          <RecentMovements />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'
import BalanceCard from '../../components/banca/dashboard/BalanceCard.vue'
import RecentMovements from '../../components/banca/dashboard/RecentMovements.vue'
</script>