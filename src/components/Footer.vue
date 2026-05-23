<template>
  <footer class="bg-[#085F63] py-8 px-6">
    <div class="container mx-auto max-w-7xl">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p class="text-white text-sm">© 2026 Banco Universitario</p>

        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-4">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.href"
              class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              :aria-label="social.label"
            >
              <component :is="social.icon" class="text-white" :size="20" />
            </a>
          </div>
          <span class="text-white text-sm">@bancouniversitariove</span>
        </div>

        <div class="hidden md:block w-48"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Twitter } from 'lucide-vue-next'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
]
</script>
