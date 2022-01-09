import axios from "axios";

export function loadText(file: File): Promise<string> {
  const reader = new FileReader();
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

export async function loadDependenciesAndDevDependencies(file: File) {
  const text = await loadText(file);
  const json = JSON.parse(text);

  // package.jsonのdependencies,devDependencisを取得する
  const dependencies = json.dependencies as Record<string, string>;
  const devDependencies = json.devDependencies as Record<string, string>;

  return {
    dependencies,
    devDependencies,
  };
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
