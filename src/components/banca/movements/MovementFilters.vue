<script setup>
// Por ahora es solo el diseño visual. La lógica reactiva irá en un commit posterior.
</script>

<template>
  <div class="mb-6 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">From</label>
        <input type="date" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">To</label>
        <input type="date" class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</label>
        <select class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
          <option value="">All Transactions</option>
          <option value="1">Credits (+)</option>
          <option value="-1">Debits (-)</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Per Page</label>
        <select class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors">
          <option value="10">10 rows</option>
          <option value="20" selected>20 rows</option>
          <option value="50">50 rows</option>
        </select>
      </div>

    </div>

    <div class="mt-4">
      <button class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
        Clear filters
      </button>
    </div>
  </div>
</template>