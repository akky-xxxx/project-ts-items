import type { PackageName } from "../../../../../../../types/PackageName/PackageName.ts"
import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

const PACKAGE_NAME = "react-types" satisfies PackageName

export const REACT_TYPES_QUICKSTART = {
  installNote: {
    en: "Your project needs <code>@types/react</code> 18 or later and <code>typescript</code> 5.0 or later.",
    ja: "利用するプロジェクトに <code>@types/react</code>(18 以上)と <code>typescript</code>(5.0 以上)が必要です。",
  },
  installTitle: {
    en: "Installation",
    ja: "インストール",
  },
  pageDescription: {
    en: `This page explains how to install and use ${PACKAGE_NAME}.`,
    ja: `このページでは ${PACKAGE_NAME} の導入・使用方法を紹介します。`,
  },
  pageTitle: {
    en: "Quickstart",
    ja: "クイックスタート",
  },
  usage: {
    customCSSProperties: {
      en: "<code>CSSProperties</code> that also accepts CSS custom properties (--*).",
      ja: "CSS カスタムプロパティ(--*)も受け付ける <code>CSSProperties</code> です。",
    },
    fcWithChildren: {
      en: "<code>FC</code> whose props include <code>children</code>.",
      ja: "props に <code>children</code> を含む <code>FC</code> です。",
    },
  },
  usageTitle: {
    en: "Usage",
    ja: "使用方法",
  },
} as const satisfies Dictionary
