<template>
  <div>
    <span>package.jsonを選択する</span>
    <input type="file" accept=".json" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  file: File | null;
}>();

const emit = defineEmits<{
  (e: "update:file", file: File | null);
}>();

async function handleFileChange(event: Event) {
  // TODO as any　ほかのやり方ないか調べる
  const files = (event.target as any).files as File[];
  if (files.length === 0) {
    emit("update:file", null);
    return;
  }
  const f = files[0];
  emit("update:file", f);
}
</script>
