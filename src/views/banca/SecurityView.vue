<script setup>
import { ref } from 'vue';
import { updatePassword } from '@/services/user';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const message = ref('');

const handleUpdatePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        message.value = 'Las contraseñas nuevas no coinciden.';
        return;
    }
    
    try {
        await updatePassword(currentPassword.value, newPassword.value);
        message.value = '¡Contraseña actualizada con éxito!';
    } catch (error) {
        message.value = 'Error al actualizar. Verifica tus datos.';
    }
};
</script>

<template>
  <div class="p-8">
    <input v-model="currentPassword" type="password" placeholder="Current Password" />
    <input v-model="newPassword" type="password" placeholder="New Password" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm New Password" />
    <button @click="handleUpdatePassword">Update Password</button>
    <p>{{ message }}</p>
  </div>
</template>