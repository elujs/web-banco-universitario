<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <section class="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Contactos frecuentes</p>
              <h1 class="mt-2 text-2xl font-semibold text-slate-900">Gestiona tus contactos de confianza</h1>
              <p class="mt-3 max-w-2xl text-slate-600">
                Mantén a mano a las personas o instituciones que usas más seguido para transferencias rápidas.
              </p>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
            >
              + Agregar contacto
            </button>
          </div>

          <div class="mt-8 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
            <div class="space-y-4">
              <article
                v-for="contact in contacts"
                :key="contact.name"
                class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white">
                  {{ contact.initials }}
                </div>

                <div class="flex-1">
                  <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 class="font-semibold text-slate-800">{{ contact.name }}</h2>
                      <p class="text-sm text-slate-600">{{ contact.description }}</p>
                    </div>
                    <span class="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                      {{ contact.tag }}
                    </span>
                  </div>
                </div>

                <div class="text-right text-sm text-slate-600">
                  <p class="font-semibold text-slate-800">{{ contact.account }}</p>
                  <p class="mt-1">{{ contact.bank }}</p>
                </div>
              </article>
            </div>

            <aside class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Resumen</p>
              <h2 class="mt-2 text-lg font-semibold text-slate-900">Tus contactos más usados</h2>
              <p class="mt-2 text-sm text-slate-600">
                Aquí verás información rápida para tus transferencias preferidas.
              </p>

              <div class="mt-5 space-y-3">
                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-sm text-slate-500">Contactos registrados</p>
                  <p class="mt-1 text-2xl font-semibold text-slate-900">4</p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-sm text-slate-500">Transferencias rápidas</p>
                  <p class="mt-1 text-2xl font-semibold text-slate-900">12</p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-sm text-slate-500">Última actualización</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">Hoy, 09:30 a. m.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'

const contacts = [
  {
    name: 'Ana Morales',
    initials: 'AM',
    description: 'Estudiante de Ingeniería',
    account: 'Cuenta • 0012-4567',
    bank: 'Banco Universitario',
    tag: 'Frecuente',
  },
  {
    name: 'Carlos Rojas',
    initials: 'CR',
    description: 'Pago de mensualidad',
    account: 'Cuenta • 0023-9876',
    bank: 'Banco Universitario',
    tag: 'Prioritario',
  },
  {
    name: 'Lucía Fernández',
    initials: 'LF',
    description: 'Apoyo familiar',
    account: 'Cuenta • 0045-1122',
    bank: 'Banco Universitario',
    tag: 'Nuevo',
  },
  {
    name: 'Servicios UCS',
    initials: 'SU',
    description: 'Pagos institucionales',
    account: 'Cuenta • 0099-3410',
    bank: 'Banco Universitario',
    tag: 'Institución',
  },
]
</script>
