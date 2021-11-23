<template>
  <div>{{ issue.title }}</div>
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
