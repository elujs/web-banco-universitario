<script setup>
// Recibimos los movimientos como una prop
defineProps({
  movements: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="bg-white overflow-hidden mt-6">
    <table class="min-w-full divide-y divide-gray-100">
      <thead>
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
          <th class="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
          <th class="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Final Balance</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-50">
        <tr v-for="mov in movements" :key="mov.id" class="hover:bg-gray-50/50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">#{{ mov.id }}</td>
          
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 flex items-center gap-2">
            <svg v-if="mov.amount > 0" class="w-4 h-4 text-green-500 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            <svg v-else class="w-4 h-4 text-red-500 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            {{ mov.description }}
          </td>
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ mov.created_at }}</td>
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold" :class="mov.amount > 0 ? 'text-green-500' : 'text-gray-900'">
            {{ mov.amount > 0 ? '+' : '' }}{{ mov.amount }}
          </td>
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400">{{ mov.balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>