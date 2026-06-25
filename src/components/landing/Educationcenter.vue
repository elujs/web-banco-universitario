<template>
  <section id="education-center" class="relative overflow-hidden bg-gray-100 py-20 px-6 font-sans">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Column - Text Content -->
        <div class="space-y-6 text-left">
          <h2 class="text-4xl md:text-5xl font-bold text-[#085F63] leading-tight">
            Centro de Educación Financiera
          </h2>

          <p class="text-gray-700 text-base md:text-lg leading-relaxed">
            Participa en nuestros talleres gratuitos. Aprende a manejar tu crédito,
            crear un presupuesto y ahorrar para tus metas universitarias.
          </p>

          <div class="pt-2">
            <button class="bg-[#085F63] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#085F63]/90 transition-all duration-300 hover:shadow-lg focus:outline-none">
              Ver próximos talleres
            </button>
          </div>
        </div>

        <!-- Right Column - Image -->
        <div class="relative">
          <div class="relative rounded-[32px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1080&auto=format&fit=crop" 
              alt="Students collaborating and studying together" 
              class="w-full h-[400px] object-cover"
            />
            <!-- Overlay gradient to perfectly match the image integration -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#085F63]/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive states needed since this banner displays static informational content
</script>