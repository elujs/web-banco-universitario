<script setup>
import { ref } from 'vue';
import { updatePassword } from '@/services/user';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const message = ref('');
const isLoading = ref(false); // Nueva variable de estado

const handleUpdatePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        message.value = 'Las contraseñas nuevas no coinciden.';
        return;
    }
    
    isLoading.value = true; // Activamos el estado de carga
    try {
        await updatePassword(currentPassword.value, newPassword.value);
        message.value = '¡Contraseña actualizada con éxito!';
    } catch (error) {
        message.value = error.response?.data?.message || 'Error al actualizar.';
    } finally {
        isLoading.value = false; // Desactivamos el estado de carga
    }
};
</script>

<template>
  <div class="p-8 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-2">Security</h2>
    <div class="bg-white p-6 rounded-xl border shadow-sm">
      <input v-model="currentPassword" type="password" placeholder="Current Password" class="w-full mb-4 p-2 border rounded" />
      <input v-model="newPassword" type="password" placeholder="New Password" class="w-full mb-4 p-2 border rounded" />
      <input v-model="confirmPassword" type="password" placeholder="Confirm New Password" class="w-full mb-4 p-2 border rounded" />
      
      <button @click="handleUpdatePassword" :disabled="isLoading" 
              class="bg-[#085F63] text-white w-full py-2 rounded disabled:opacity-50">
        {{ isLoading ? 'Updating...' : 'Update Password' }}
      </button>
      
      <p class="mt-4 text-center">{{ message }}</p>
    </div>
  </div>
</template>