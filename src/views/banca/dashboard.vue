<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <section class="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Panel del banco</p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900">Bienvenido a tu banca universitaria</h1>
        <p class="mt-3 max-w-2xl text-slate-600">
          Aquí podrás encontrar tus opciones principales de forma rápida desde el panel lateral.
        </p>

        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 class="font-semibold text-slate-800">Resumen rápido</h2>
            <p class="mt-2 text-sm text-slate-600">Consulta tu información principal desde un solo lugar.</p>
          </article>
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 class="font-semibold text-slate-800">Accesos directos</h2>
            <p class="mt-2 text-sm text-slate-600">El selector lateral te permitirá moverte entre secciones del banco.</p>
          </article>
        </div>
      </section>

        <Selector />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'
</script>
