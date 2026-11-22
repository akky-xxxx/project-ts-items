import { setupServer } from "msw/node"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import { reposListCommits, reposListReleases } from "../../generated/gitHubRest/gitHubRest.ts"
import { gitHubRestHandlers } from "./gitHubRestHandlers.ts"

vi.mock(import("server-only"), () => ({}))

const server = setupServer(...gitHubRestHandlers)

describe(reposListCommits, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  afterAll(() => {
    server.close()
  })

  it("モックのハンドラでは、message の1行目の末尾に -mock を付けた commit を返す", async () => {
    expect.hasAssertions()
    await expect(reposListCommits("owner", "repo")).resolves.toMatchObject({
      data: [
        { commit: { message: "fix(oxlint-config): fix rule-mock\n\nbody-mock" } },
        { commit: { message: "feat(oxlint-config): add rule-mock" } },
      ],
      status: 200,
    })
  })
})

describe(reposListReleases, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  afterAll(() => {
    server.close()
  })

  it("モックのハンドラでは、tag の末尾に -mock を付けた release を返す", async () => {
    expect.hasAssertions()
    await expect(reposListReleases("owner", "repo")).resolves.toMatchObject({
      data: [
        { id: 2, tag_name: "oxlint-config-v1.1.0-mock" },
        { id: 1, tag_name: "oxlint-config-v1.0.0-mock" },
      ],
      status: 200,
    })
  })
})
