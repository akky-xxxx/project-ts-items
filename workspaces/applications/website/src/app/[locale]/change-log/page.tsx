// TODO: 何ができるか検証してる最中のため静的解析一旦不要
/* oxlint-disable no-magic-numbers, consistent-return, no-console */
import { FetchedFeatureEnabled } from "../../../components/feature/FetchedFeatureEnabled/FetchedFeatureEnabled.tsx"
import { reposListCommits, reposListReleases } from "../../../generated/gitHubRest/gitHubRest.ts"

import type { ReactNode } from "react"

const page = async (): Promise<ReactNode> => {
  const result0 = await reposListReleases(
    "akky-xxxx",
    "project-ts-items",
    {},
    { next: { revalidate: 3600 } },
  )
  const result = await reposListCommits(
    "akky-xxxx",
    "project-ts-items",
    // {},
    { path: "workspaces/packages/configurations/oxlint-config", sha: "main" },
    { next: { revalidate: 3600 } },
  ).then((response) => {
    if (response.status !== 200) {
      return
    }
    return response.data.filter(
      (commit) => commit.parents.length <= 1 && commit.commit.message.startsWith("feat"),
    )
  })
  console.log(result0)

  return (
    <FetchedFeatureEnabled
      featureName="changeLogPagesFeature"
      newFeatureElement={
        <ul>
          {result?.map((commit) => (
            <li key={commit.sha}>{commit.commit.message.split("\n")[0]}</li>
          ))}
        </ul>
      }
    />
  )
}

export default page
