<template>
  <div class="border-4 border-green-500 p-2 inline-block">
    <input type="text" placeholder="検索ワード" v-model="searchWord" />
    <IconSearch />
  </div>
</template>

<script setup>
import IconSearch from "./IconSearch.vue";
const searchWord = ref("");
</script>
