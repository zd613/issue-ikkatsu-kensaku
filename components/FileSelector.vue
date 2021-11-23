<template>
  <div>
    <span>package.jsonを選択する</span>
    <input type="file" accept=".json" @change="handleFileChange" />

    {{ selectedPackagejson?.name ?? "not selected" }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineComponent<{
  file: File | null;
}>();

const emit = defineEmits<{
  (e: "update:file", file: File | null);
}>();

const selectedPackagejson = ref<File | null>(null);
async function handleFileChange(event: Event) {
  // TODO as any　ほかのやり方ないか調べる
  const files = (event.target as any).files as File[];
  if (files.length === 0) {
    emit("update:file", null);
    return;
  }
  const f = files[0];
  selectedPackagejson.value = f;
  emit("update:file", f);
}
</script>
