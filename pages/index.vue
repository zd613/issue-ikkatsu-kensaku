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

        // １個だけで試す
        break
    }
}


</script>