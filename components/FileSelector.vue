<template>
  <div>
    <!-- {{ file ?? "null" }} -->
    <label
      :for="fileSelectorId"
      class="
        border-2 border-gray-500
        bg-gray-100
        p-3
        rounded-3xl
        text-gray-800
        flex
        cursor-pointer
        shadow-xl
        hover:shadow-2xl
      "
    >
      <div>
        <IconUpload class="w-16 h-16 text-gray-500" />
      </div>
      <div class="flex flex-col ml-4">
        <span class="inline-block">package.jsonを選択する</span>
        <div class="font-semibold text-2xl">
          <p v-if="selectedFile === null" class="text-red-500">未選択</p>
          <p v-else class="text-green-500">{{ selectedFile.name }}　選択中</p>
        </div>

        <input
          type="file"
          accept=".json"
          @change="handleFileChange"
          class="hidden"
          :id="fileSelectorId"
        />
      </div>
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
  console.log("Handle file change");
  // TODO as any　ほかのやり方ないか調べる
  const files = (event.target as any).files as File[];
  console.log(files);
  console.log(files.length);
  console.log(files.length === 0);
  if (files.length === 0) {
    console.log("update file");
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
