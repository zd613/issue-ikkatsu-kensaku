<template>
  <div class="border-4 border-green-500 p-2 inline-block">
    <input type="text" placeholder="検索ワード" v-model="searchWord" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 inline-block"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script setup>
const searchWord = ref("");
</script>
