<template>
  <div class="border border-gray-800 p-2">
    <a :href="issue.url" target="_blank">
      <div>{{ issue.title }}</div>
      <div>ステータス: {{ issue.state }}</div>
      <div>createdAt: {{ formatCreatedAt }}</div>
      <div>updatedAt: {{ formatUpdatedAt }}</div>
      <!-- <div v-html="issue.body"></div> -->
    </a>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
import { format } from "date-fns";
const props = defineProps<{
  issue: IssueInfo;
}>();

const formatDate = (date: string) => {
  const d = new Date(date);
  return format(d, "yyyy/MM/dd kk-mm-ss");
};

const formatCreatedAt = computed(() => {
  return formatDate(props.issue.createdAt);
});
const formatUpdatedAt = computed(() => {
  return formatDate(props.issue.updatedAt);
});
</script>
