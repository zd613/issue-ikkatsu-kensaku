<template>
  <div>
    <div v-for="(issue, index) in issues" :key="index">
      <IssueItem :issue="issue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IssueInfo } from "~~/interfaces/IssueInfo";
defineProps({
  issues: Array as PropType<IssueInfo[]>,
});
</script>
