<template>
  <div v-html="output"></div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const props = defineProps<{
  source: string;
}>();

const output = computed(() => {
  return marked(props.source);
});
</script>
