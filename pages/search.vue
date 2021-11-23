<template>
  <div class="bg-blue-200 h-screen">
    <div class="flex flex-row h-full">
      <div class="w-64 p-3">
        <h1 class="font-bold text-2xl p-1 text-gray-800 my-4">Issue一括検索</h1>
        <div class="my-2">
          <SearchBox @search="handleSearch" />
        </div>
        <div class="my-6">
          <FileSelector v-model:file="selectedFile" />
        </div>
        <div>
          <RepositoryList :repositories="repositories" />
        </div>
      </div>

      <div class="w-full h-full p-3">
        <div class="flex flex-col items-center justify-center w-4/5 mx-auto">
          <h2 class="font-bold text-3xl text-gray-800">検索結果</h2>

          <div class="mt-12">
            <IssueList :issues="issues" />
          </div>
        </div>
      </div>
    </div>
    {{ selectedFile?.name ?? "not selected" }}
  </div>
</template>

<script setup lang="ts">
import { IssueInfo } from "~~/interfaces/issueInfo";
import { RepositoryInfo } from "~~/interfaces/repositoryInfo";
import FileSelector from "~~/components/FileSelector.vue";
import {
  fetchIssues,
  fetchRegistryData,
  loadDependenciesAndDevDependencies,
} from "~~/lib/search";

// 検索を実行する
const repositories = ref<RepositoryInfo[]>([]);
const issues = ref<IssueInfo[]>([]);
const search = async (file: File) => {
  // dependencisとdevDependencies取得
  const { dependencies, devDependencies } =
    await loadDependenciesAndDevDependencies(file);

  console.log(dependencies);
  console.log(devDependencies);

  let libraryName = "";
  for (const [libName, libVersion] of Object.entries(dependencies)) {
    libraryName = libName;
    // repositories.value.push()
    // TODO: あとで変更。1つだけでテストする
    break;
  }
  // リポジトリ名を検索

  const registryData = await fetchRegistryData(libraryName);
  repositories.value.push({
    name: `${registryData.owner}/${registryData.repoName}`,
  });

  console.log(registryData);

  // リポジトリからissueを検索
  // TODO: 検索ワードを入力したもの使うようにする
  const page = 1; // TODO: ページ変更できるようにする
  const repoIssues = await fetchIssues(
    registryData.owner,
    registryData.repoName,
    "test",
    page
  );
  console.log("done");
  console.log(repoIssues);

  // TODO: 試しに1つだけ表示しているので、すべて表示させる
  const repoIssue = repoIssues.items[0];
  console.log(repoIssue);
  console.log(repoIssue.updated_at);
  const issueInfo: IssueInfo = {
    title: repoIssue.title,
    url: repoIssue.html_url,
    state: repoIssue.state,
    updatedAt: repoIssue.updated_at,
  };

  issues.value.push(issueInfo);
};

const selectedFile = ref<File | null>(null);
// 検索されたとき
const handleSearch = (e) => {
  // データ初期化
  repositories.value = [];
  issues.value = [];

  console.log("e");
  console.log(e);

  // package.jsonのファイルが選択されていねければ、そのことを表示
  if (selectedFile.value === null) {
    alert("package.jsonファイルを選択されていません。選択してください。");
    return;
  }

  search(selectedFile.value);
};
</script>
