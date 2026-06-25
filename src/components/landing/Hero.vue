<template>
  <section
    id="inicio"
    class="min-h-screen pt-28 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white font-sans"
  >
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-sans">
            Tu banco universitario, <span class="text-[#085F63]">100% digital</span>
          </h1>

          <p class="text-gray-600 text-base md:text-lg max-w-xl font-sans">
            Gestiona tus finanzas de manera inteligente. Transferencias sin comisión, pagos de
            matrícula y más, todo desde tu smartphone.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              placeholder="Ingresa tu correo universitario"
              class="flex-1 px-5 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085F63] transition-all shadow-sm font-sans"
            />
            <button
              class="bg-[#085F63] hover:bg-[#0a7a7f] text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap font-sans"
            >
              <span class="font-semibold">Crear cuenta</span>
              <ArrowRight :size="18" />
            </button>
          </div>

          <div class="flex items-center gap-4 mt-8 font-sans">
            <div class="flex -space-x-3 overflow-hidden">
              <img
                class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Estudiante 1"
              />
              <img
                class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Estudiante 2"
              />
              <img
                class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                alt="Estudiante 3"
              />
              <img
                class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Estudiante 4"
              />
            </div>

            <div class="flex flex-col">
              <p class="text-sm font-bold text-[#030213] leading-tight font-sans">
                Únete a +5000 estudiantes
              </p>
              <p class="text-xs text-gray-500 font-medium font-sans">que ya confían en nosotros</p>
            </div>
          </div>
        </div>

        <div class="relative w-full max-w-[360px] mx-auto pt-10">
          <div
            class="relative mx-auto w-[290px] h-[590px] bg-[#030213] rounded-[48px] p-[10px] shadow-[0_25px_60px_-15px_rgba(3,2,19,0.35)] border border-gray-700/30"
          >
            <div
              class="absolute inset-[1px] rounded-[47px] border border-white/10 pointer-events-none z-30"
            ></div>

            <div
              class="absolute -left-[3px] top-[120px] w-[3px] h-[40px] bg-gray-800 rounded-l-md"
            ></div>
            <div
              class="absolute -left-[3px] top-[175px] w-[3px] h-[40px] bg-gray-800 rounded-l-md"
            ></div>
            <div
              class="absolute -right-[3px] top-[140px] w-[3px] h-[60px] bg-gray-800 rounded-r-md"
            ></div>

            <div
              class="relative w-full h-full bg-white rounded-[38px] overflow-hidden shadow-inner flex flex-col z-10"
            >
              <div
                class="absolute top-3 left-1/2 transform -translate-x-1/2 w-[90px] h-[22px] bg-[#030213] rounded-full z-30 flex items-center justify-end px-3"
              >
                <div class="w-1.5 h-1.5 bg-gray-900 rounded-full border border-gray-800/40"></div>
              </div>

              <img
                src="@/assets/dashboard-mockup.png"
                alt="Banca en línea"
                class="w-full h-full object-cover object-top select-none"
              />
            </div>

            <div
              class="absolute -bottom-6 -left-14 w-[270px] h-[165px] bg-gradient-to-br from-[#085F63] to-[#0a4649] rounded-2xl p-5 text-white shadow-[0_20px_50px_rgba(8,95,99,0.3)] z-20 transform -rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-105 select-none font-sans border border-white/10"
            >
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold tracking-widest text-white/90">VISA</span>
                <div
                  class="w-9 h-7 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-md opacity-90 shadow-sm"
                ></div>
              </div>

              <div class="text-lg tracking-widest font-mono font-medium mb-3 mt-1 text-white/90">
                •••• •••• •••• 8264
              </div>

              <div class="flex justify-between items-end mt-4">
                <div class="flex flex-col">
                  <span class="text-[9px] uppercase tracking-wider text-white/60 font-semibold"
                    >Titular</span
                  >
                  <span class="text-xs font-bold tracking-wide">CARLOS MÉNDEZ</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-[9px] uppercase tracking-wider text-white/60 font-semibold"
                    >Tipo</span
                  >
                  <span
                    class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md uppercase tracking-wide"
                    >Estudiante</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>

<style scoped></style>
