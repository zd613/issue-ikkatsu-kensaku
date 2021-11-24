<template>
  <div class="border border-gray-800 p-2">
    <a :href="issue.url" target="_blank">
      <div>{{ issue.title }}</div>
      <div>ステータス: {{ issue.state }}</div>
      <div>updatedAt: {{ formatUpdatedAt }}</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
import { format } from "date-fns";
const props = defineProps<{
  issue: IssueInfo;
}>();

const formatUpdatedAt = computed(() => {
  const date = new Date(props.issue.updatedAt);
  //yyyy-MM-dd'T'HH:mm:ss.SSSxxx
  // TODO: 時間表示する
  // TODO: JSTにする？
  return format(date, "yyyy/MM/dd");
});
</script>
