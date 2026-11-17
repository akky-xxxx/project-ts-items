import { PACKAGE_NAMES } from "../../../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"

import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const OXLINT_CONFIG_QUICK = {
  installTitle: {
    en: "Installation",
    ja: "インストール",
  },
  pageDescription: {
    en: `This page explains how to install and set up ${PACKAGE_NAMES.oxlintConfig}.`,
    ja: `このページでは ${PACKAGE_NAMES.oxlintConfig} の導入・設定方法を紹介します。`,
  },
  pageTitle: {
    en: "Quickstart",
    ja: "クイックスタート",
  },
  selectConfiguration: {
    en: "Select base configuration",
    ja: "ベースとなる設定を選択",
  },
  setupTitle: {
    en: "Setup",
    ja: "設定方法",
  },
  switching: {
    storybookDescription: {
      en: "Relaxes some rules for Storybook.",
      ja: "Storybook 向けに一部ルールを緩和します。",
    },
    typeAwareLintingDescription: {
      en: 'Enables linting that uses type information (disabled by default in oxlint).<br></br>We recommend enabling it.<br></br>If you enable it, you need to install "oxlint-tsgolint".',
      ja: "型情報を使ったリンティングを有効にします（oxlint のデフォルトでは無効）。<br></br>有効にすることをおすすめします。<br></br>有効にした場合、「oxlint-tsgolint」をインストールする必要があります。",
    },
    typeAwareLintingTitle: {
      en: "Type-aware linting",
      ja: "型情報を使ったリンティング",
    },
    vitestDescription: {
      en: "Enables the Vitest plugin and adjusts its settings.",
      ja: "Vitest プラグインを有効にし、関連する設定を調整します。",
    },
  },
} as const satisfies Dictionary
