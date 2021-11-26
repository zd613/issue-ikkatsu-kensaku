<template>
  <div class="border-4 border-green-500 p-2 inline-block">
    <input
      type="text"
      placeholder="検索ワード"
      v-model="internalSearchWord"
      @keydown.enter="search"
    />
    <IconSearch class="cursor-pointer" @click="search" />
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./IconSearch.vue";
const word = ref("");

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "search", event: Event, searchWord: string);
  (e: "update:modelValue", searchWord: string);
}>();
const search = (e) => {
  emits("search", e, word.value);
};

const internalSearchWord = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value: string) => {
    emits("update:modelValue", value);
  },
});
</script>
