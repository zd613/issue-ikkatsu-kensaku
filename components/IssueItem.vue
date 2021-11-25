<template>
  <div class="border border-gray-800 p-2">
    <a :href="issue.url" target="_blank">
      <div>{{ issue.title }}</div>
      <div>ステータス: {{ issue.state }}</div>
      <div>updatedAt: {{ formatUpdatedAt }}</div>
      <!-- <div>
        {{ issue.updatedAt }}
      </div> -->
      <!-- <div>
        {{ new Date(issue.updatedAt).getTimezoneOffset() }}
      </div> -->
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
  return format(date, "yyyy/MM/dd kk-mm-ss");
});
</script>
