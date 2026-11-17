import { PACKAGE_NAMES } from "../../../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"

import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const OXFMT_CONFIG_QUICK = {
  installTitle: {
    en: "Installation",
    ja: "インストール",
  },
  pageDescription: {
    en: `This page explains how to install and set up ${PACKAGE_NAMES.oxfmtConfig}.`,
    ja: `このページでは ${PACKAGE_NAMES.oxfmtConfig} の導入・設定方法を紹介します。`,
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
