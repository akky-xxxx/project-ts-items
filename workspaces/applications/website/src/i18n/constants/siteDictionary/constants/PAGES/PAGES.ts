import { PACKAGE_NAMES } from "../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: {
    packageTitleText: {
      en: "Packages",
      ja: "パッケージ",
    },
    pageDescription: {
      en: `${PROJECT_NAME} is a collection of small packages for everyday development.<br></br>It mainly provides packages for TypeScript projects, React, and Next.js.`,
      ja: `${PROJECT_NAME} は日々の開発に使える、小さなパッケージ群です<br></br>TypeScript を使ったプロジェクトや React, Next.js 向けのパッケージを提供しています`,
    },
    pageTitle: {
      en: "Tool for TypeScript projects",
      ja: "TypeScript プロジェクトのためのツール",
    },
  },
  oxlintConfig: {
    backgroundDescription: {
      en: "It helps keep code maintainable regardless of each team member's skill level,<br></br>and works well as a guardrail when implementing with generative AI.<br></br>All thresholds are set on the strict side, and each rule is meant to be relaxed as you use it in practice.",
      ja: "開発メンバーのスキルの高低に応じず、コードの保守性を担保しやすくするためや<br></br>生成 AI による実装時のガードレール等に最適です<br></br>しきい値は全て厳し目にしていて各ルールの設定は運用をしていく中で緩和していく想定です",
    },
    backgroundTitle: {
      en: "Overview",
      ja: "概要",
    },
    pageDescription: {
      en: "Shareable configuration for oxlint.<br></br>It also enables useful rules that are not included in the recommended set.",
      ja: "oxlint の配布用設定です<br></br>recommended だけでは設定されない導入するメリットがあるルールも設定されてます",
    },
    pageTitle: {
      en: "Introduction",
      ja: "はじめに",
    },
  },
  oxlintConfigQuickstart: {
    installTitle: {
      en: "Installation",
      ja: "インストール",
    },
    pageDescription: {
      en: `This page explains how to install and set up ${PACKAGE_NAMES.oxlintConfig}.`,
      ja: `このページでは ${PACKAGE_NAMES.oxlintConfig} の導入・設定方法を紹介します`,
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
        ja: "Storybook 向けに一部ルールを緩和します",
      },
      typeAwareLintingDescription: {
        en: 'Enables linting that uses type information (disabled by default in oxlint).<br></br>We recommend enabling it.<br></br>If you enable it, you need to install "oxlint-tsgolint".',
        ja: "型情報を使ったリンティングを有効にします（oxlint のデフォルトでは無効）<br></br>有効にすることをおすすめします<br></br>有効にした場合、「oxlint-tsgolint」をインストールする必要があります",
      },
      typeAwareLintingTitle: {
        en: "Type-aware linting",
        ja: "型情報を使ったリンティング",
      },
    },
  },
  packages: {
    pageDescription: {
      en: `Packages managed by ${PROJECT_NAME}.`,
      ja: `${PROJECT_NAME} で管理しているパッケージの一覧です`,
    },
    pageTitle: {
      en: "Packages",
      ja: "パッケージ",
    },
  },
} as const satisfies Dictionary
