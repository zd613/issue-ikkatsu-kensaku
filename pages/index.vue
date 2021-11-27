<template>
  <div>
    <header></header>

    <main>
      <article>
        <div class="bg-blue-200 min-h-screen flex justify-center items-center">
          <div class="flex flex-col">
            <h1 class="text-5xl font-semibold text-gray-800 -mt-32">
              Issue一括検索
            </h1>

            <div class="mt-12">
              <p>package.jsonに含まれているパッケージからissueを検索します。</p>
            </div>

            <div class="flex flex-row">
              <FileSelector @change="handleFileChange" />
            </div>
            <div>
              <SearchBox v-model="searchWord" @click="searchIssues" />
            </div>

            <div v-if="dep !== ''">
              {{ dep }}
            </div>
            <div class="bg-gray-100">
              <div v-for="(item, index) in issues" :key="index">
                <a :href="item.html_url" target="_blank">
                  <div class="inline-block">
                    {{ item.title }}
                  </div>
                  <div class="inline">({{ item.state }})</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { loadText, fetchRegistryData, fetchIssues } from "@/lib/search";

interface IssueItem {
  html_url: string;
  title: string;
  state: string;
}

const issues = ref([] as IssueItem[]);

const dep = ref("");

const searchWord = ref("");

const selectedPackagejson = ref<File | null>(null);
async function handleFileChange(event: Event) {
  // TODO as any　ほかのやり方ないか調べる
  const files = (event.target as any).files as File[];
  if (files.length === 0) {
    return;
  }
  const file = files[0];
  selectedPackagejson.value = file;
}

async function searchIssues() {
  const file = selectedPackagejson.value;
  if (!file) {
    alert("package.jsonを選択してください。");
    return;
  }

  // json読み込み(package.json想定)
  // TODO: 型調べる
  const text = await loadText(file as File);
  const json = JSON.parse(text);

  // package.jsonのdependenciesを取得する
  const dependencies = json.dependencies;

  for (const [libName, version] of Object.entries(dependencies)) {
    console.log(libName + ":" + version);
    dep.value = libName + ":" + version;

    // npm のregistryから探す
    const { owner, repoName } = await fetchRegistryData(libName);
    console.log({ owner, repoName });

    // issueを取得する
    let page = 1;
    // let word = 'test' // 検索ワード

    const word = searchWord.value;
    const issuesData = await fetchIssues(owner, repoName, word, page);
    console.log(issuesData);

    issues.value = issuesData.items;

    // １個だけで試す
    break;
  }
}
</script>
