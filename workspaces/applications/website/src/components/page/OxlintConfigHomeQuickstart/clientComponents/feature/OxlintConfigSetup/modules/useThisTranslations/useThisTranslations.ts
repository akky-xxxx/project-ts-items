import { useTranslations } from "next-intl"

export const useThisTranslations = () => {
  const pageTranslate = useTranslations("pages.oxlintConfigQuickstart")
  const uiTranslate = useTranslations("components.ui")

  return { pageTranslate, uiTranslate }
}
