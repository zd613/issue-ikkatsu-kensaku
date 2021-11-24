<template>
  <div class="border-2 border-gray-400 p-2">
    <div v-for="(issue, index) in issues" :key="index">
      <IssueItem :issue="issue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
defineProps<{
  issues: IssueInfo[];
}>();
</script>
