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
              <SearchBox v-model="searchWord" @search="searchIssues" />
            </div>
          </div>
        </div>
      </article>
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { loadText, fetchRegistryData } from "@/lib/search";
const router = useRouter();

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
  console.log("HHH");
  const file = selectedPackagejson.value;
  if (!file) {
    alert("package.jsonを選択してください。");
    return;
  }

  router.push({
    path: "search",
    query: {
      q: searchWord.value,
    },
  });
  return;

  // json読み込み(package.json想定)
  const text = await loadText(file as File);
  const json = JSON.parse(text);

  // package.jsonのdependenciesを取得する
  const dependencies = json.dependencies;

  for (const [libName, version] of Object.entries(dependencies)) {
    // npm のregistryから探す
    const { owner, repoName } = await fetchRegistryData(libName);
    console.log({ owner, repoName });
  }
}
</script>
