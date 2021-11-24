<template>
  <div>
    <label
      :for="fileSelectorId"
      class="border-4 border-green-500 p-3 inline-block"
    >
      <span class="inline-block">package.jsonを選択する</span>
      <span v-if="selectedFile !== null">{{ selectedFile.name }}　選択中</span>
      <input
        type="file"
        accept=".json"
        @change="handleFileChange"
        class="hidden"
        :id="fileSelectorId"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  file: File | null;
}>();

const emit = defineEmits<{
  (e: "update:file", file: File | null);
}>();

const selectedFile = ref<File | null>(null);
async function handleFileChange(event: Event) {
  // TODO as any　ほかのやり方ないか調べる
  const files = (event.target as any).files as File[];
  if (files.length === 0) {
    emit("update:file", null);
    return;
  }
  const f = files[0];
  selectedFile.value = f;
  emit("update:file", f);
}

const fileSelectorId = computed(() => {
  return "file-selector-id";
});
</script>
