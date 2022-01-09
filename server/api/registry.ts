import axios from "axios";
import type { IncomingMessage, ServerResponse } from "http";
import url from "url";

// npm.jsのregistry情報を取得する
export async function fetchRegistryData(libraryName: string) {
  const endpoint = `https://registry.npmjs.org/${libraryName}/latest`;
  const { data } = await axios.get(endpoint);
  const version = data.version;
  const repository = data.repository as { type: string; url: string };
  // console.log(version);
  // console.log(repository);
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

export default async (req: IncomingMessage, res: ServerResponse) => {
  //
  const query = url.parse(req.url, true).query;
  // TODO: libraryName存在チェック
  // TODO: string string[]解消
  const libraryName = query.libraryName as string;
  // console.log(libraryName);
  const { owner, repoName } = await fetchRegistryData(libraryName);
  // console.log(owner, repoName);
  return JSON.stringify({
    owner,
    repoName,
  });
};
