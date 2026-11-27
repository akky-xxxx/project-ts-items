import { describe, expect, it } from "vitest"

import { getCurrentAnchor } from "./getCurrentAnchor.ts"

const ANCHORS = ["#about", "#install", "#setup"]

describe(getCurrentAnchor, () => {
  it("判定範囲に入っている見出しのうち、目次の並び順で最初の anchor を返す", () => {
    const actual = getCurrentAnchor({
      anchors: ANCHORS,
      intersectingAnchors: new Set(["#setup", "#install"]),
      previousAnchor: "#about",
    })
    expect(actual).toBe("#install")
  })

  it("判定範囲に見出しが無い場合は、直前の anchor を返す", () => {
    const actual = getCurrentAnchor({
      anchors: ANCHORS,
      intersectingAnchors: new Set(),
      previousAnchor: "#install",
    })
    expect(actual).toBe("#install")
  })

  it("判定範囲に見出しが無く、直前の anchor も無い場合は undefined を返す", () => {
    const actual = getCurrentAnchor({
      anchors: ANCHORS,
      intersectingAnchors: new Set(),
      previousAnchor: undefined,
    })
    expect(actual).toBeUndefined()
  })

  it("目次に無い anchor は判定範囲に入っていても無視する", () => {
    const actual = getCurrentAnchor({
      anchors: ANCHORS,
      intersectingAnchors: new Set(["#unknown"]),
      previousAnchor: "#about",
    })
    expect(actual).toBe("#about")
  })
})
