<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(15px); /* Entra deslizándose sutilmente desde la derecha */
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-15px); /* Sale deslizándose hacia la izquierda */
}
</style>