<template>
  <section class="min-h-screen bg-gray-50 py-16 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      <div class="grid md:grid-cols-2">
        <div class="hidden md:block bg-[#085F63] text-white p-10">
          <div class="space-y-6">
            <h2 class="text-3xl font-bold">Registro de usuario</h2>
            <p class="text-gray-100 leading-relaxed">
              Crea tu cuenta para acceder al banco universitario. Completa los datos personales y selecciona tu tipo de usuario.
            </p>
            <div class="rounded-3xl bg-white/10 p-5">
              <p class="text-sm uppercase tracking-[0.25em] text-gray-200">Información</p>
              <p class="mt-3 text-sm text-gray-200/80">
                Nombre, correo y documento son necesarios para habilitar tu perfil.
              </p>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-10">
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900">Crear nueva cuenta</h1>
            <p class="text-gray-600 mt-2">Ingresa los datos del usuario para completar el registro.</p>
            <p v-if="successMessage" class="text-green-600 mt-3">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-red-600 mt-3">{{ errorMessage }}</p>
          </div>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="nombre">Nombre</label>
                <input
                  id="nombre"
                  v-model="nombre"
                  @input="onTextInput($event,'nombre')"
                  type="text"
                  placeholder="Ej. María"
                  :class="inputClass(errors.nombre)"
                  class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
                />
                <p v-if="errors.nombre" class="text-red-600 text-sm mt-1">{{ errors.nombre }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="apellido">Apellido</label>
                <input
                  id="apellido"
                  v-model="apellido"
                  @input="onTextInput($event,'apellido')"
                  type="text"
                  placeholder="Ej. Pérez"
                  :class="inputClass(errors.apellido)"
                  class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
                />
                <p v-if="errors.apellido" class="text-red-600 text-sm mt-1">{{ errors.apellido }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="email">Correo electrónico</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="usuario@correo.com"
                :class="inputClass(errors.email)"
                class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="telefono">Teléfono</label>
                <input
                  id="telefono"
                  v-model="telefono"
                  @input="onPhoneInput($event,'telefono')"
                  type="tel"
                  inputmode="tel"
                  placeholder="+58 412 123 4567"
                  :class="inputClass(errors.telefono)"
                class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
                />
                <p v-if="errors.telefono" class="text-red-600 text-sm mt-1">{{ errors.telefono }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="fechaNacimiento">Fecha y hora de nacimiento</label>
                <input
                  id="fechaNacimiento"
                  v-model="fechaNacimiento"
                  type="date"
                  :class="inputClass(errors.fechaNacimiento)"
                  class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
                />
              <p v-if="errors.fechaNacimiento" class="text-red-600 text-sm mt-1">{{ errors.fechaNacimiento }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="documento">Nº de documento</label>
              <input
                id="documento"
                v-model="documento"
                @input="onNumberInput($event,'documento')"
                inputmode="numeric"
                placeholder="12345678"
                :class="inputClass(errors.documento)"
                class="w-full px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
              />
            <p v-if="errors.documento" class="text-red-600 text-sm mt-1">{{ errors.documento }}</p>
            </div>

            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="contrasena">Contraseña</label>
              <input
                id="contrasena"
                v-model="contrasena"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :class="inputClass(errors.contrasena)"
                class="w-full pr-24 px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
              />
              <button
                type="button"
                class="absolute right-3 top-[calc(50%+0.7rem)] -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
                @click="togglePassword('contrasena')"
              >
                {{ showPassword ? 'Ocultar' : 'Mostrar' }}
              </button>
                <p v-if="errors.contrasena" class="text-red-600 text-sm mt-1">{{ errors.contrasena }}</p>
            </div>

            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-2" for="confirmarContrasena">Confirmar contraseña</label>
                <input
                  id="confirmarContrasena"
                  v-model="confirmarContrasena"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  :class="inputClass(errors.confirmarContrasena)"
                  class="w-full pr-24 px-4 py-3 rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none transition"
                />
              <button
                type="button"
                class="absolute right-3 top-[calc(50%+0.7rem)] -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
                @click="togglePassword('confirmarContrasena')"
              >
                {{ showConfirmPassword ? 'Ocultar' : 'Mostrar' }}
              </button>
              <p v-if="errors.confirmarContrasena" class="text-red-600 text-sm mt-1">{{ errors.confirmarContrasena }}</p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#085F63] hover:bg-[#0a7a7f] text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
            >
              {{ isLoading ? 'Creando usuario...' : 'Crear usuario' }}
            </button>

            <button
              @click="goHome"
              type="button"
              class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
            >
              Volver al inicio
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const telefono = ref('')
const fechaNacimiento = ref('')
const documento = ref('')
const contrasena = ref('')
const confirmarContrasena = ref('')

const errors = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  fechaNacimiento: '',
  tipoUsuario: '',
  documento: '',
  contrasena: '',
  confirmarContrasena: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword(field) {
  if (field === 'contrasena') {
    showPassword.value = !showPassword.value
  } else {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}
 

const inputClass = (err) =>
  `w-full px-4 py-3 rounded-2xl border ${err ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200'} bg-gray-50 text-gray-900 focus:outline-none transition`

function sanitizeNumberInput(value) {
  return (value || '').replace(/\D+/g, '')
}

function onNumberInput(e, field) {
  const clean = sanitizeNumberInput(e.target.value)
  if (field === 'documento') documento.value = clean
  e.target.value = clean
}

function sanitizePhoneInput(value) {
  let clean = (value || '').replace(/[^0-9+]/g, '')

  if (clean.startsWith('+')) {
    clean = '+' + clean.slice(1).replace(/\+/g, '')
  } else {
    clean = clean.replace(/\+/g, '')
  }

  return clean
}

function onPhoneInput(e) {
  const clean = sanitizePhoneInput(e.target.value)
  telefono.value = clean
  e.target.value = clean
}

function onTextInput(e, field) {
  // permite letras, espacios, acentos, guiones y apóstrofe
  const clean = (e.target.value || '').replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]/g, '')
  if (field === 'nombre') nombre.value = clean
  if (field === 'apellido') apellido.value = clean
  e.target.value = clean
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validate() {
  // reset
  Object.keys(errors).forEach(k => errors[k] = '')

  let valid = true
  if (!nombre.value.trim()) { errors.nombre = 'Falta el nombre'; valid = false }
  if (!apellido.value.trim()) { errors.apellido = 'Falta el apellido'; valid = false }
  if (!email.value.trim()) { errors.email = 'Falta el correo'; valid = false }
  else if (!validateEmail(email.value)) { errors.email = 'Correo inválido'; valid = false }
  if (!telefono.value.trim()) { errors.telefono = 'Falta el teléfono'; valid = false }
  if (!fechaNacimiento.value) { errors.fechaNacimiento = 'Falta la fecha de nacimiento'; valid = false }
  if (!documento.value.trim()) { errors.documento = 'Falta el número de documento'; valid = false }
  if (!contrasena.value) { errors.contrasena = 'Falta la contraseña'; valid = false }
  else if (contrasena.value.length < 8) { errors.contrasena = 'La contraseña debe tener al menos 8 caracteres'; valid = false }
  if (!confirmarContrasena.value) { errors.confirmarContrasena = 'Confirma la contraseña'; valid = false }
  if (contrasena.value && confirmarContrasena.value && contrasena.value !== confirmarContrasena.value) {
    errors.confirmarContrasena = 'Las contraseñas no coinciden'
    valid = false
  }

  return valid
}

function formatFechaNacimiento(value) {
  if (!value) return ''
  return `${value}t00:00:00Z`
}


async function onSubmit() {
  if (isLoading.value) return
  if (!validate()) return

  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  const payload = {
    first_name: nombre.value,
    last_name: apellido.value,
    document_number: documento.value,
    birth_date: formatFechaNacimiento(fechaNacimiento.value),
    phone_number: telefono.value,
    email: email.value,
    
    password: contrasena.value
  }

  try {
    const response = await fetch('/v1/public/client/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al crear el usuario')
    }

    successMessage.value = 'Usuario creado correctamente. Redirigiendo al inicio de sesión...'
    setTimeout(() => router.push('/login'), 1200)
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      errorMessage.value =
        'No se pudo conectar con el servidor. Verifica que la API esté en ejecución en localhost:3000.'
    } else {
      errorMessage.value = error.message || 'Ocurrió un error al registrar el usuario.'
    }
  } finally {
    isLoading.value = false
  }
}

function goHome() {
  router.push('/')
}
</script>