<template>
  <div class="border-2 border-gray-800 p-2 w-80">
    <div v-for="(item, index) in props.repositories">
      <RepositoryItem :repository="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RepositoryInfo } from "@/interfaces/RepositoryInfo";

const props = defineProps({
  repositories: {
    type: Array as PropType<RepositoryInfo[]>,
    required: true,
  },
});
</script>
