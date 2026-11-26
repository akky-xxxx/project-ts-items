/**
 * 英語表示で各スイッチの SwitchDescription に渡る props(表示順)。
 * T.rich は `<br></br>` を renderLineBreak の要素に置き換え、前後の文字列と配列で返す
 */
export const EXPECTED_LABEL_PROPS = [
  {
    descriptionText: [
      "Enables linting that uses type information (disabled by default in oxlint).",
      { type: "br" },
      "We recommend enabling it.",
      { type: "br" },
      'If you enable it, you need to install "oxlint-tsgolint".',
    ],
    titleText: "Type-aware linting",
  },
  {
    descriptionText: "Enables the Vitest plugin and adjusts its settings.",
    titleText: "Vitest",
  },
  {
    descriptionText: "Relaxes some rules for Storybook.",
    titleText: "Storybook",
  },
]
