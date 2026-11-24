import { useTranslations } from "next-intl"

import { renderCodeElement } from "../../../utilities/renderCodeElement/renderCodeElement.tsx"
import { CUSTOM_CSS_PROPERTIES_CODE } from "./constants/CUSTOM_CSS_PROPERTIES_CODE/CUSTOM_CSS_PROPERTIES_CODE.ts"
import { FC_WITH_CHILDREN_CODE } from "./constants/FC_WITH_CHILDREN_CODE/FC_WITH_CHILDREN_CODE.ts"

import type { TypeRecord } from "./components/TypeRecord/TypeRecord.tsx"
import type { ComponentProps } from "react"

export const useReactTypesQuickstart = () => {
  const pagesTranslate = useTranslations("pages")
  const pageTitleText = pagesTranslate("reactTypesQuickstart.pageTitle")
  const types = [
    {
      code: CUSTOM_CSS_PROPERTIES_CODE,
      description: pagesTranslate.rich("reactTypesQuickstart.usage.customCSSProperties", {
        code: renderCodeElement,
      }),
      lang: "tsx",
      typeName: "CustomCSSProperties",
    },
    {
      code: FC_WITH_CHILDREN_CODE,
      description: pagesTranslate.rich("reactTypesQuickstart.usage.fcWithChildren", {
        code: renderCodeElement,
      }),
      lang: "tsx",
      typeName: "FcWithChildren",
    },
  ] as const satisfies ComponentProps<typeof TypeRecord>[]

  return {
    pageTitleText,
    pagesTranslate,
    types,
  }
}
