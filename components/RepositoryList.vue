<template>
  <div class="border-2 border-gray-800 p-2">
    <div
      v-for="(item, index) in props.repositories"
      :key="'repo-item-' + index"
      class="cursor-pointer"
      @click="onClick(index)"
    >
      <RepositoryItem :repository="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RepositoryInfo } from "~~/interfaces/repositoryInfo";

const props = defineProps<{
  repositories: RepositoryInfo[];
}>();

const emits = defineEmits<{
  (e: "change:selected-repository", reopName: string);
}>();

const onClick = (index: number) => {
  const repoName = props.repositories[index].name;
  emits("change:selected-repository", repoName);
};
</script>
