<template>
  <div class="border-2 border-gray-500 p-2 rounded-xl">
    <div
      v-for="(item, index) in props.repositories"
      :key="'repo-item-' + index"
      class="cursor-pointer"
      @click="onClick(index)"
    >
      <RepositoryItem
        :repository="item"
        :active="activeIndex === null ? false : index === activeIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RepositoryInfo } from "~~/interfaces/repositoryInfo";

const props = withDefaults(
  defineProps<{
    repositories: RepositoryInfo[];
    activeIndex?: number | null;
  }>(),
  { activeIndex: null }
);

const emits = defineEmits<{
  (e: "change:selected-repository", reopName: string);
}>();

const onClick = (index: number) => {
  const repoName = props.repositories[index].name;
  emits("change:selected-repository", repoName);
};
</script>
