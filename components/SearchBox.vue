<template>
  <div class="border-4 border-green-500 p-2 inline-block">
    <input
      type="text"
      placeholder="検索ワード"
      v-model="searchWord"
      @keydown.enter="search"
    />
    <IconSearch class="cursor-pointer" @click="search" />
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./IconSearch.vue";
const searchWord = ref("");

const emits = defineEmits<{
  (e: "search", event: Event, searchWord: string);
}>();
const search = (e) => {
  emits("search", e, searchWord.value);
};
</script>
