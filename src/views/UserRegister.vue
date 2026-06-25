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
            <p class="text-gray-600 mt-2">
              Ingresa los datos del usuario para completar el registro.
            </p>
          </div>

          <form class="space-y-5" @submit.prevent>
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej. María"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="apellido">
                  Apellido
                </label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Ej. Pérez"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="usuario@correo.com"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="telefono">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="text"
                  placeholder="+58 412 123 4567"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="fechaNacimiento">
                  Fecha de nacimiento
                </label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="tipoUsuario">
                  Tipo de usuario
                </label>
                <select
                  id="tipoUsuario"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="externo">Externo</option>
                </select>
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="documento">
                  Nº de documento
                </label>
                <input
                  id="documento"
                  type="text"
                  placeholder="V-12345678"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="contrasena">
                  Contraseña
                </label>
                <input
                  id="contrasena"
                  type="text"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2" for="confirmarContrasena">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmarContrasena"
                  type="text"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition"
                />
              </div>

            </div>

            <button
              type="submit"
              class="w-full bg-[#085F63] hover:bg-[#0a7a7f] text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
            >
              Crear usuario
            </button>

            <button
            @click="$router.push('/')"
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
</script>