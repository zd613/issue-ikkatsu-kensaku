<template>
  <div class="border border-gray-800 p-2">
    <div class="flex flex-row w-4/5">
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
        <div class="text-gray-800 text-right mt-4 mr-2">
          作成日: {{ formatCreatedAt }}
        </div>
        <div>
          <a :href="issue.url" target="_blank">
            <IconExternalLink class="text-gray-700 hover:text-blue-500" />
          </a>
        </div>
        <div class="mt-4">
          <div
            class="
              text-gray-500
              font-semibold
              text-xl
              bg-white
              inline-block
              p-1
              shadow-lg
              border-2 border-blue-400
              rounded
            "
          >
            Issue内容
            <div class="inline-block">
              <button @click="toggle">
                <IconDown v-if="isOpen" />
                <IconUp v-else />
              </button>
            </div>
          </div>
          <div
            class="mt-2 bg-white p-2 border border-blue-300 rounded"
            v-if="isOpen"
          >
            <MarkdownViewer :source="issue.body" class="w-64" />
          </div>
        </div>
        <!-- {{ issue.body }} -->
        <!-- <div>updatedAt: {{ formatUpdatedAt }}</div> -->
        <!-- <div v-html="issue.body"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
import { format } from "date-fns";
import MarkdownViewer from "./MarkdownViewer.vue";
import IconExternalLink from "./IconExternalLink.vue";

// issue内容を表示するかどうか
const isOpen = ref(true);
function toggle() {
  isOpen.value = !isOpen.value;
}

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
