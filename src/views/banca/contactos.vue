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
                Registra nuevos contactos para tus transferencias rápidas y mantén tus favoritos siempre a mano.
              </p>
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="text-sm text-slate-600">
                Usa este botón para abrir el formulario y agregar un nuevo contacto.
              </div>
              <button
                type="button"
                @click="showForm = !showForm"
                class="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
              >
                {{ showForm ? 'Cancelar' : 'Crear contacto' }}
              </button>
            </div>

            <div v-if="!showForm" class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div class="space-y-4">
                <aside class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Resumen</p>
                  <h2 class="mt-2 text-lg font-semibold text-slate-900">Tus contactos recientes</h2>
                  <p class="mt-2 text-sm text-slate-600">
                    Los nuevos contactos aparecerán aquí después de guardarse.
                  </p>

                  <div class="mt-5 space-y-3">
                    <div class="rounded-2xl border border-slate-200 bg-white p-4">
                      <p class="text-sm text-slate-500">Contactos registrados</p>
                      <p class="mt-1 text-2xl font-semibold text-slate-900">{{ contacts.length }}</p>
                    </div>
                    <div class="rounded-2xl border border-slate-200 bg-white p-4">
                      <p class="text-sm text-slate-500">Estado</p>
                      <p class="mt-1 text-sm font-semibold text-slate-900">{{ contacts.length > 0 ? 'Listo para transferir' : 'Sin contactos aún' }}</p>
                    </div>
                  </div>
                </aside>

                <div class="rounded-3xl border border-slate-200 bg-white p-5">
                  <h3 class="text-lg font-semibold text-slate-900">Lista actual</h3>
                  <div v-if="isLoading" class="mt-4 text-sm text-slate-600">Cargando contactos...</div>
                  <div v-else-if="contacts.length === 0" class="mt-4 text-sm text-slate-600">Aún no tienes contactos guardados.</div>
                  <div v-else class="mt-4 space-y-3">
                    <article
                      v-for="contact in contacts"
                      :key="contact.id ?? contact.account_number"
                      class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-semibold text-slate-800">{{ contact.alias }}</p>
                          <p class="text-sm text-slate-600">{{ contact.description }}</p>
                        </div>
                        <span class="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">{{ contact.account_number }}</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <form class="rounded-3xl border border-slate-200 bg-slate-50 p-5" @submit.prevent="handleSubmit">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-lg font-semibold text-slate-900">Crear nuevo contacto</h2>
                    <p class="mt-1 text-sm text-slate-600">Completa los datos requeridos para agregar un nuevo contacto.</p>
                  </div>
                </div>

                <div class="mt-5 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="alias">Alias</label>
                    <input
                      id="alias"
                      v-model="form.alias"
                      type="text"
                      required
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="Ej. Mamá"
                    />
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="account_number">Número de cuenta</label>
                    <input
                      id="account_number"
                      v-model="form.account_number"
                      type="text"
                      required
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="Ej. 123456789"
                    />
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripción</label>
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="4"
                      required
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      placeholder="Ej. Pago de mensualidad"
                    />
                  </div>
                </div>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p v-if="message" class="text-sm" :class="messageType === 'error' ? 'text-rose-600' : 'text-emerald-600'">
                    {{ message }}
                  </p>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-400"
                  >
                    {{ isSubmitting ? 'Guardando...' : 'Guardar contacto' }}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'
import { createContact, getContacts } from '../../services/contactService'

const contacts = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const showForm = ref(false)
const message = ref('')
const messageType = ref('success')

const form = ref({
  alias: '',
  account_number: '',
  description: '',
})

const resetForm = () => {
  form.value = {
    alias: '',
    account_number: '',
    description: '',
  }
}

const loadContacts = async () => {
  isLoading.value = true

  try {
    const data = await getContacts()
    contacts.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('No se pudieron cargar los contactos:', error)
    message.value = 'No se pudieron cargar los contactos.'
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  message.value = ''

  try {
    await createContact({
      alias: form.value.alias,
      account_number: form.value.account_number,
      description: form.value.description,
    })

    message.value = 'Contacto creado correctamente.'
    messageType.value = 'success'
    showForm.value = false
    resetForm()
    await loadContacts()
  } catch (error) {
    console.error('Error al crear el contacto:', error)
    message.value = 'No se pudo crear el contacto. Verifica los datos o intenta más tarde.'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadContacts()
})
</script>
