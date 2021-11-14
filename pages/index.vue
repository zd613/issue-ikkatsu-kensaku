<template>
  <div>
    <header></header>

    <main>
      <article>
        <h1 class="font-bold">hello world!</h1>

        <input type="file" accept=".json" @change="handleFileChange" />

        <div v-if="dep!==''">
            {{dep}}
        </div>

      </article>
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios"

function loadText(file: File): Promise<string> {
    const reader = new FileReader()
    console.log('hi')
    return new Promise((resolve) => {
        reader.onload = (event) => {
            console.log('file loaded')

            // TODO
            const text = event.target?.result
            if (typeof text === 'string') {
            return resolve(text)
            } else {
            return resolve('')
            }
        }
        reader.readAsText(file)
    })
}

// npm.jsのregistry情報を取得する
const fetchRegistryData = async (libraryName: string) => {
    const endpoint = `https://cors-anywhere-iik.herokuapp.com/https://registry.npmjs.org/${libraryName}/latest`

    const { data } = await axios.get(endpoint)

    const version = data.version
    const repository = data.repository as { type: string; url: string }
    console.log(version)
    console.log(repository)
    if (repository.type === 'git') {
    const tmp = repository.url
    // urlになってないので直す
    const toUrl = (repoUrl: string) => {
        // はじめの git+を削除
        // うしろの.gitを削除
        return repoUrl.replace('git+', '').replace('.git', '')
    }
    const url = toUrl(tmp)

    const getOwnerAndRepoName = (repositoryUrl: string) => {
        // TODO: 最後に/がついているとき
        const split = repositoryUrl.split('/')
        const length = split.length
        return [split[length - 2], split[length - 1]] // 後ろから2番目と一番後ろ
    }

    const [owner, repo] = getOwnerAndRepoName(url)
    return { owner, repoName: repo }
    }
    return { owner: '', repoName: '' }
}




const dep=ref("")

async function handleFileChange(event: Event) {
    // TODO as any　ほかのやり方ないか調べる
    const files = (event.target as any).files as File[]
    if (files.length === 0) {
        return
    }
    const file = files[0]

    // json読み込み(package.json想定)
    const text = await loadText(file)
    const json = JSON.parse(text)

    // package.jsonのdependenciesを取得する
    const dependencies = json.dependencies


    for (const [libName, version] of Object.entries(dependencies)) {
        console.log(libName + ':' + version)
        dep.value=libName+":"+version

        // npm のregistryから探す
        const { owner, repoName } = await fetchRegistryData(libName)
        console.log({owner,repoName})

        // １個だけで試す
        break
    }
}


</script>