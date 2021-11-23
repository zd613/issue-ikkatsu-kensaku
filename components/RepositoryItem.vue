<template>
  <nuxt-link :to="repository.url">
    <div class="border border-gray-500 p-1">
      <div>{{ repository.name }}</div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RepositoryInfo } from "@/interfaces/RepositoryInfo";

const props = defineProps({
  repository: {
    type: Object as PropType<RepositoryInfo>,
    required: true,
  },
});
</script>
