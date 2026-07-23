<template>
  <div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <AppHeader />

      <div class="flex flex-col gap-6 lg:flex-row">
        <Selector />

        <section class="flex-1">
          <!-- Cabecera unificada con la estética de la banca -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#085F63] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-slate-900">Gestiona tus contactos de confianza</h1>
                <p class="text-xs text-slate-400">Busca, agrega y administra tus contactos universitarios.</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                @click="showForm = !showForm"
                class="inline-flex items-center justify-center rounded-2xl bg-[#085F63] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#064a4d]"
              >
                {{ showForm ? 'Cancelar' : 'Crear contacto' }}
              </button>
            </div>
                        <div v-if="!showForm" class="space-y-4">
              <div class="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 class="text-lg font-semibold text-slate-900">Lista actual</h3>
                <div v-if="isLoading" class="mt-4 text-sm text-slate-600">Cargando contactos...</div>
                <div v-else-if="contacts.length === 0" class="mt-4 text-sm text-slate-600">Aún no tienes contactos guardados.</div>
                <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div
                    v-for="contact in contacts"
                    :key="contact.id ?? contact.account_number"
                    class="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#085F63] hover:bg-slate-100/80"
                  >
                    <button
                      type="button"
                      class="w-full text-left"
                      @click="openContactModal(contact.id)"
                    >
                      <div class="space-y-2">
                        <p class="font-semibold text-slate-800">{{ contact.alias }}</p>
                        <p class="text-sm font-medium text-slate-700">{{ contact.account_number }}</p>
                        <p class="text-sm text-slate-600">{{ contact.description }}</p>
                      </div>
                    </button>

                    <div class="mt-3 border-t border-slate-200 pt-3">
                      <div class="flex flex-wrap gap-2">
                        <button
                          type="button"
                          class="rounded-xl border border-emerald-600 bg-white px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                          @click="openEditModal(contact)"
                        >
                          Modificar
                        </button>
                        <button
                          type="button"
                          class="rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                          @click="openDeleteModal(contact)"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
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
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#085F63] focus:ring-1 focus:ring-[#085F63]"
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
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#085F63] focus:ring-1 focus:ring-[#085F63]"
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
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#085F63] focus:ring-1 focus:ring-[#085F63]"
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
                    class="inline-flex items-center justify-center rounded-2xl bg-[#085F63] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#064a4d] disabled:cursor-not-allowed disabled:bg-slate-400"
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

    <!-- Modal de Detalles simplificado: Solo Nombre (Alias) y Número de Cuenta -->
    <div v-if="isContactModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div class="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Detalle del contacto</p>
            <h3 class="mt-1 text-xl font-bold text-slate-900">Información del contacto</h3>
          </div>
          <button type="button" class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" @click="closeContactModal">
            ✕
          </button>
        </div>

        <div v-if="selectedContactLoading" class="mt-6 text-sm text-slate-600">Cargando información del contacto...</div>
        <div v-else-if="selectedContactError" class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {{ selectedContactError }}
        </div>
        <div v-else-if="selectedContact" class="mt-6 space-y-4">
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            
            <div class="space-y-1">
              <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Nombre (Alias)</p>
              <p class="text-base font-bold text-slate-900">{{ selectedContactAlias }}</p>
            </div>

            <div class="border-t border-slate-200"></div>

            <div class="space-y-1">
              <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Número de cuenta</p>
              <p class="text-sm font-semibold text-slate-800">{{ selectedContact.account_number || 'No disponible' }}</p>
            </div>

            <div class="border-t border-slate-200"></div>

            <div class="space-y-1">
              <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Nombre completo</p>
              <p class="text-sm font-semibold text-slate-800">
                {{ [selectedContact.first_name, selectedContact.last_name].filter(Boolean).join(' ') || selectedContact.alias || 'No disponible' }}
              </p>
            </div>

            <div class="border-t border-slate-200"></div>

            <div class="border-t border-slate-200"></div>

            <div class="space-y-1">
              <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Cédula</p>
              <p class="text-sm font-semibold text-slate-800">{{ selectedContact.document_number || selectedContact.cedula || 'No disponible' }}</p>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl border border-emerald-600 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              @click="openEditModal(selectedContact)"
            >
              Modificar
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
              @click="openDeleteModal(selectedContact)"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Eliminar contacto</p>
            <h3 class="mt-1 text-xl font-bold text-slate-900">¿Deseas eliminar este contacto?</h3>
          </div>
          <button type="button" class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" @click="closeDeleteModal">
            ✕
          </button>
        </div>

        <p class="mt-4 text-sm text-slate-600">
          Esta acción eliminará a <span class="font-semibold text-slate-800">{{ contactToDelete?.alias || 'este contacto' }}</span> de tu lista de contactos.
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeDeleteModal"
          >
            Cancelar
          </button>
          <button
            type="button"
            :disabled="isDeleting"
            class="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-400"
            @click="deleteSelectedContact"
          >
            {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="isEditModalOpen" class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div class="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#085F63]">Modificar contacto</p>
            <h3 class="mt-1 text-xl font-bold text-slate-900">Actualiza los datos del contacto</h3>
          </div>
          <button type="button" class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" @click="closeEditModal">
            ✕
          </button>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="submitEditContact">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-alias">Alias</label>
            <input
              id="edit-alias"
              v-model="editForm.alias"
              type="text"
              required
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#085F63] focus:ring-1 focus:ring-[#085F63]"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="edit-description">Descripción</label>
            <textarea
              id="edit-description"
              v-model="editForm.description"
              rows="4"
              required
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#085F63] focus:ring-1 focus:ring-[#085F63]"
            />
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <p v-if="editMessage" class="text-sm" :class="editMessageType === 'error' ? 'text-rose-600' : 'text-emerald-600'">
              {{ editMessage }}
            </p>
            <button
              type="submit"
              :disabled="isEditing"
              class="inline-flex items-center justify-center rounded-2xl bg-[#085F63] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#064a4d] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {{ isEditing ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AppHeader from '../../components/layout/AppHeader.vue'
import Selector from '../../components/layout/selector.vue'
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../../services/contactService'

const contacts = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const showForm = ref(false)
const isContactModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedContact = ref(null)
const contactToDelete = ref(null)
const selectedContactLoading = ref(false)
const selectedContactError = ref('')
const isEditing = ref(false)
const isDeleting = ref(false)
const editMessage = ref('')
const editMessageType = ref('success')
const message = ref('')
const messageType = ref('success')

const form = ref({
  alias: '',
  account_number: '',
  description: '',
})

const editForm = ref({
  alias: '',
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

const openContactModal = async (contactId) => {
  if (!contactId) return

  isContactModalOpen.value = true
  selectedContactLoading.value = true
  selectedContactError.value = ''
  selectedContact.value = null

  try {
    selectedContact.value = await getContactById(contactId)
  } catch (error) {
    console.error('No se pudo cargar el detalle del contacto:', error)
    selectedContactError.value = 'No se pudo cargar la información de este contacto.'
  } finally {
    selectedContactLoading.value = false
  }
}

const selectedContactAlias = computed(() => {
  if (!selectedContact.value || typeof selectedContact.value !== 'object') {
    return 'No disponible'
  }

  return selectedContact.value.alias || selectedContact.value.name || selectedContact.value.username || 'No disponible'
})

const closeContactModal = () => {
  isContactModalOpen.value = false
  selectedContact.value = null
  selectedContactError.value = ''
}

const openEditModal = (contact) => {
  if (!contact) return

  selectedContact.value = contact
  editForm.value = {
    alias: contact.alias ?? '',
    description: contact.description ?? '',
  }
  editMessage.value = ''
  editMessageType.value = 'success'
  isEditModalOpen.value = true
  isContactModalOpen.value = false
}

const openDeleteModal = (contact) => {
  if (!contact) return

  contactToDelete.value = contact
  isDeleteModalOpen.value = true
  isContactModalOpen.value = false
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  contactToDelete.value = null
  isDeleting.value = false
}

const deleteSelectedContact = async () => {
  if (!contactToDelete.value?.id) {
    message.value = 'No se encontró el identificador del contacto.'
    messageType.value = 'error'
    return
  }

  isDeleting.value = true

  try {
    await deleteContact(contactToDelete.value.id)
    message.value = 'Contacto eliminado correctamente.'
    messageType.value = 'success'
    await loadContacts()
    closeDeleteModal()
  } catch (error) {
    console.error('Error al eliminar el contacto:', error)
    message.value = 'No se pudo eliminar el contacto.'
    messageType.value = 'error'
  } finally {
    isDeleting.value = false
  }
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  editMessage.value = ''
  editForm.value = {
    alias: '',
    description: '',
  }
}

const submitEditContact = async () => {
  if (!selectedContact.value?.id) {
    editMessage.value = 'No se encontró el identificador del contacto.'
    editMessageType.value = 'error'
    return
  }

  isEditing.value = true
  editMessage.value = ''

  try {
    await updateContact(selectedContact.value.id, {
      alias: editForm.value.alias,
      description: editForm.value.description,
    })

    editMessage.value = 'Contacto actualizado correctamente.'
    editMessageType.value = 'success'
    await loadContacts()
    closeEditModal()
  } catch (error) {
    console.error('Error al actualizar el contacto:', error)
    editMessage.value = 'No se pudo actualizar el contacto.'
    editMessageType.value = 'error'
  } finally {
    isEditing.value = false
  }
}

onMounted(() => {
  loadContacts()
})
</script>