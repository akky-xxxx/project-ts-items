import type { PackageName } from "../../../../../../../types/PackageName/PackageName.ts"
import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

const PACKAGE_NAME = "oxfmt-config" satisfies PackageName

export const OXFMT_CONFIG_QUICK = {
  installTitle: {
    en: "Installation",
    ja: "インストール",
  },
  pageDescription: {
    en: `This page explains how to install and set up ${PACKAGE_NAME}.`,
    ja: `このページでは ${PACKAGE_NAME} の導入・設定方法を紹介します。`,
  },
  pageTitle: {
    en: "Quickstart",
    ja: "クイックスタート",
  },
  setupTitle: {
    en: "Setup",
    ja: "設定方法",
  },
} as const satisfies Dictionary
