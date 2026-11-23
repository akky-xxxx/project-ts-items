import { MOCK_SIMPLE_USER } from "../MOCK_SIMPLE_USER/MOCK_SIMPLE_USER.ts"

import type { GitHubRelease } from "../../../../generated/gitHubRest/gitHubRest.ts"

const RELEASES_URL = "https://api.github.com/repos/owner-mock/repo-mock/releases"

/** Id と tag だけが異なる release を作る */
const createRelease = (id: number, tagName: string): GitHubRelease => ({
  assets: [],
  assets_url: `${RELEASES_URL}/${id}/assets`,
  author: MOCK_SIMPLE_USER,
  body: "body-mock",
  created_at: "2026-01-01T00:00:00Z",
  draft: false,
  html_url: `https://github.com/owner-mock/repo-mock/releases/tag/${tagName}`,
  id,
  name: tagName,
  node_id: `node-id-${id}`,
  prerelease: false,
  published_at: "2026-01-01T00:00:00Z",
  tag_name: tagName,
  tarball_url: null,
  target_commitish: "main",
  upload_url: `https://uploads.github.com/repos/owner-mock/repo-mock/releases/${id}/assets{?name,label}`,
  url: `${RELEASES_URL}/${id}`,
  zipball_url: null,
})

/** モックの release 一覧(新しい順)。実際の結果と見分けるため、tag の末尾に -mock を付ける */
export const MOCK_RELEASES = ["oxlint-config-v1.1.0-mock", "oxlint-config-v1.0.0-mock"].map(
  // Id は古いものから 1, 2, … と振る
  (tagName, index, tagNames) => createRelease(tagNames.length - index, tagName),
) satisfies GitHubRelease[]
