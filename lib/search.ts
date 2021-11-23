import axios from "axios";

export function loadText(file: File): Promise<string> {
  const reader = new FileReader();
  console.log("hi");
  return new Promise((resolve) => {
    reader.onload = (event) => {
      console.log("file loaded");

      // TODO
      const text = event.target?.result;
      if (typeof text === "string") {
        return resolve(text);
      } else {
        return resolve("");
      }
    };
    reader.readAsText(file);
  });
}

// npm.jsのregistry情報を取得する
export async function fetchRegistryData(libraryName: string) {
  const endpoint = `https://cors-anywhere-iik.herokuapp.com/https://registry.npmjs.org/${libraryName}/latest`;

  const { data } = await axios.get(endpoint);

  const version = data.version;
  const repository = data.repository as { type: string; url: string };
  console.log(version);
  console.log(repository);
  if (repository.type === "git") {
    const tmp = repository.url;
    // urlになってないので直す
    const toUrl = (repoUrl: string) => {
      // はじめの git+を削除
      // うしろの.gitを削除
      return repoUrl.replace("git+", "").replace(".git", "");
    };
    const url = toUrl(tmp);

    const getOwnerAndRepoName = (repositoryUrl: string) => {
      // TODO: 最後に/がついているとき
      const split = repositoryUrl.split("/");
      const length = split.length;
      return [split[length - 2], split[length - 1]]; // 後ろから2番目と一番後ろ
    };

    const [owner, repo] = getOwnerAndRepoName(url);
    return { owner, repoName: repo };
  }
  return { owner: "", repoName: "" };
}

export async function fetchIssues(
  owner: string,
  repo: string,
  word: string,
  page = 1
) {
  const { data } = await axios.get("https://api.github.com/search/issues", {
    params: {
      q: `repo:${owner}/${repo} is:issue ${word}`,
      per_page: 30,
      page: page,
    },
  });

  return data;
}
