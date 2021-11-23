<template>
  <div class="bg-blue-200 h-screen">
    <div class="flex flex-row h-full">
      <div class="w-64 p-3">
        <h1 class="font-bold text-2xl p-1 text-gray-800 my-4">Issue一括検索</h1>
        <div class="my-2">
          <SearchBox />
        </div>
        <div class="my-6">
          <FileSelector />
        </div>
        <div>
          <RepositoryList :repositories="repositoryList" />
        </div>
      </div>

      <div class="w-full h-full p-3">
        <div class="flex flex-col items-center justify-center w-4/5 mx-auto">
          <h2 class="font-bold text-3xl text-gray-800">検索結果</h2>

          <div class="mt-12">
            <IssueList :issues="issueList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/IssueInfo";
import { RepositoryInfo } from "~~/interfaces/RepositoryInfo";
import FileSelector from "~~/components/FileSelector.vue";

const repositoryList: RepositoryInfo[] = [
  {
    name: "hi",
    url: "",
  },
  {
    name: "hello",
    url: "",
  },
];

const issueList: IssueInfo[] = [
  {
    title: "issue1",
  },
  {
    title: "issue2",
  },
];
</script>
