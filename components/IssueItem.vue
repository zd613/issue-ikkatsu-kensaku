<template>
  <div>
    <a :href="issue.url" target="_blank">
      <div>{{ issue.title }}</div>
      <div>ステータス: {{ issue.state }}</div>
      <div>updatedAt: {{ issue.updatedAt }}</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IssueInfo } from "~~/interfaces/issueInfo";

defineProps({
  issue: {
    type: Object as PropType<IssueInfo>,
    required: true,
  },
});
</script>
