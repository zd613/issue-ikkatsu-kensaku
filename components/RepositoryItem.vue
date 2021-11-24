<template>
  <div>
    <div class="border border-gray-500 p-1 hover:bg-blue-300">
      <div>{{ repository.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RepositoryInfo } from "~~/interfaces/repositoryInfo";

const props = defineProps({
  repository: {
    type: Object as PropType<RepositoryInfo>,
    required: true,
  },
});
</script>
