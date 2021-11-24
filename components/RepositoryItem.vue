<template>
  <div>
    <div class="border border-gray-500 p-1 hover:bg-blue-300">
      <div>{{ repository.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RepositoryInfo } from "~~/interfaces/repositoryInfo";

defineProps<{
  repository: RepositoryInfo;
}>();
</script>
