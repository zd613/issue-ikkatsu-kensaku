<template>
  <div>
    <h1>issue検索</h1>

    <div>
      <SearchBox />
      <div>
        <RepositoryList :repositories="repositoryList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RepositoryInfo } from "~~/interfaces/RepositoryInfo";

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
</script>
