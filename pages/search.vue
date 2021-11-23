<template>
  <div>
    <h1>issue検索</h1>

    <div>
      <SearchBox />
      <FileSelector />
      <div>
        <RepositoryList :repositories="repositoryList" />
      </div>
    </div>

    <div>
      <IssueList :issues="issueList" />
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
