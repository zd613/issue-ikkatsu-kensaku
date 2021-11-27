<template>
  <div class="bg-blue-200 h-screen">
    <div class="flex flex-row h-full">
      <div class="w-64 p-3 h-full">
        <h1 class="font-bold text-2xl p-1 text-gray-800 my-4 flex-col">
          Issue一括検索
        </h1>

        <div class="overflow-y-auto h-3/5">
          <RepositoryList
            :repositories="repositories"
            :active-index="selectedRepoIndex"
            @change:selected-repository="handleSelectedRepositoryChange"
          />
        </div>
      </div>

      <div class="w-full h-full p-3">
        <div
          class="flex flex-col items-center justify-start w-4/5 h-full mx-auto"
        >
          <h2 class="font-bold text-3xl text-gray-800">検索結果</h2>
          <div class="my-2">
            <SearchBox @search="handleSearch" v-model="searchWord" />
          </div>
          <div class="my-6">
            <FileSelector v-model:file="selectedFile" />
          </div>
          <div class="mt-12 overflow-y-auto">
            <IssueList :issues="issues" />
          </div>
        </div>
      </div>
    </div>
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
const search = async (file: File, searchWord: string) => {
  // dependencisとdevDependencies取得
  const { dependencies, devDependencies } =
    await loadDependenciesAndDevDependencies(file);

  console.log(dependencies);
  console.log(devDependencies);

  let libraryName = "";
  let firstRegistryData = null;
  for (const [libName, libVersion] of Object.entries(dependencies)) {
    libraryName = libName;
    // TODO: ライブラリのバージョンも考慮する？
    const registryData = await fetchRegistryData(libraryName);

    repositories.value.push({
      name: `${registryData.owner}/${registryData.repoName}`,
    });

    // 最初のデータを保持しておく
    if (firstRegistryData === null) {
      firstRegistryData = registryData;
    }
  }
  // リポジトリ名を検索

  console.log(firstRegistryData);
  const page = 1; // TODO: ページ変更できるようにする

  await searchAndShowIssues(
    firstRegistryData.owner,
    firstRegistryData.repoName,
    searchWord,
    page
  );
};
const searchWord = ref("");
const searchAndShowIssues = async (
  owner: string,
  repoName: string,
  searchWord: string,
  page: number
) => {
  // リポジトリからissueを検索
  const repoIssues = await fetchIssues(owner, repoName, searchWord, page);
  console.log("done");
  console.log(repoIssues);

  // 取得したissueを表示させる
  // TODO: すべてのissueを表示しているわけではないので、すべて見れるようにページ処理追加する。total_count,incomplete_results参考にする
  const issueInfoList = repoIssues.items.map((item) => {
    return {
      title: item.title,
      url: item.html_url,
      state: item.state,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      body: item.body,
    } as IssueInfo;
  });
  console.log(issueInfoList);
  issues.value.push(...issueInfoList);
};

const selectedFile = ref<File | null>(null);
// 検索されたとき
const handleSearch = (e, searchWord: string) => {
  // データ初期化
  repositories.value = [];
  issues.value = [];

  console.log("e");
  console.log(e);
  console.log(searchWord);

  // package.jsonのファイルが選択されていねければ、そのことを表示
  if (selectedFile.value === null) {
    alert("package.jsonファイルを選択されていません。選択してください。");
    return;
  }

  search(selectedFile.value, searchWord);
};

const selectedRepoIndex = ref(0);

const handleSelectedRepositoryChange = async (repoName: string) => {
  console.log("リポジトリ選択変更:" + repoName);
  // issueの表示クリア
  issues.value = [];

  const newSelectedIndex = repositories.value.findIndex((elem) => {
    return elem.name === repoName;
  });
  selectedRepoIndex.value = newSelectedIndex;

  // TODO: 変数名が owner/repoName で repoNameになっている？
  const [owner, name] = repoName.split("/");
  const page = 1;
  await searchAndShowIssues(owner, name, searchWord.value, page);
};
</script>
