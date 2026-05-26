<template>
  <section id="contacto" class="py-20 px-6 bg-white">
    <div class="container mx-auto max-w-7xl">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-800">¿Tienes alguna pregunta?</h2>
          <form class="space-y-4" @submit.prevent>
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2"
                >Nombre</label
              >
              <input
                type="text"
                id="name"
                placeholder="Tu nombre completo"
                class="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085F63] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2"
                >Correo universitario</label
              >
              <input
                type="email"
                id="email"
                placeholder="tu-correo@universidad.edu"
                class="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085F63] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label for="university" class="block text-sm font-semibold text-gray-700 mb-2"
                >Universidad</label
              >
              <select
                id="university"
                class="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#085F63] focus:border-transparent transition-all"
              >
                <option value="">Selecciona tu universidad</option>
                <option value="ucla">UCLA</option>
                <option value="ucv">Universidad Central de Venezuela</option>
                <option value="iutvc">IUTVC</option>
                <option value="usb">Universidad Simón Bolívar</option>
                <option value="otra">Otra</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full bg-[#085F63] hover:bg-[#0a7a7f] text-white px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#085F63]/30 font-semibold"
            >
              Enviar consulta
            </button>
          </form>
        </div>

        <div class="space-y-8">
          <div>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Sede Principal</h3>
            <div class="flex items-start space-x-4 mb-6">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#085F63]/10 flex items-center justify-center"
              >
                <MapPin class="text-[#085F63]" :size="24" />
              </div>
              <div>
                <p class="text-gray-700 leading-relaxed">
                  Av. Universidad, Edificio Banco Universitario, piso 12, Caracas.
                </p>
              </div>
            </div>
            <div class="flex items-start space-x-4 mb-6">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#085F63]/10 flex items-center justify-center"
              >
                <Phone class="text-[#085F63]" :size="24" />
              </div>
              <div>
                <p class="text-gray-800 font-semibold mb-1">Teléfonos y Fax</p>
                <p class="text-gray-700">+58 212 555-0100</p>
                <p class="text-gray-700">+58 212 555-0101</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#085F63]/10 flex items-center justify-center"
              >
                <Mail class="text-[#085F63]" :size="24" />
              </div>
              <div>
                <p class="text-gray-800 font-semibold mb-1">Correo</p>
                <a href="mailto:ayuda@bancouniversitario.ve" class="text-[#085F63] hover:underline"
                  >ayuda@bancouniversitario.ve</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin, Phone, Mail } from 'lucide-vue-next'
</script>
