<template>
  <div
    class="
      border-2 border-gray-500
      px-4
      py-2
      inline-block
      bg-gray-100
      rounded-3xl
      shadow-xl
      hover:shadow-2xl
    "
  >
    <div class="flex flex-row">
      <input
        type="text"
        placeholder="検索ワード"
        v-model="internalSearchWord"
        @keydown.enter="search"
        class="bg-gray-100 focus:outline-none text-lg"
        autocomplete="on"
      />
      <button @click="search">
        <IconSearch class="teaxt-green-800" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./IconSearch.vue";

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "search", event: Event, searchWord: string);
  (e: "update:modelValue", searchWord: string);
}>();
const search = (e) => {
  emits("search", e, internalSearchWord.value);
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
