<template>
  <div class="border border-gray-800 p-2">
    <a :href="issue.url" target="_blank" class="flex flex-row">
      <div class="flex-shrink-0 w-12 flex justify-center items-center">
        <div v-if="issue.state === 'open'">
          <IconIssueOpen class="text-green-500" />
        </div>
        <div v-else-if="issue.state === 'closed'">
          <IconIssueClosed class="text-purple-500" />
        </div>
        <div v-else>{{ issue.state }}</div>
      </div>
      <div class="w-full">
        <div class="font-bold text-xl text-gray-700">{{ issue.title }}</div>
        <div class="text-gray-500 text-right mt-4 mr-2">
          作成日: {{ formatCreatedAt }}
        </div>
        <div>
          <MarkdownViewer :source="issue.body" />
        </div>
        <!-- {{ issue.body }} -->
        <!-- <div>updatedAt: {{ formatUpdatedAt }}</div> -->
        <!-- <div v-html="issue.body"></div> -->
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
import { format } from "date-fns";
import MarkdownViewer from "./MarkdownViewer.vue";

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
