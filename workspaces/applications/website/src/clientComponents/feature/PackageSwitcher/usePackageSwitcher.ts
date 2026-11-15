import { useTranslations } from "next-intl"

import { usePathname, useRouter } from "../../../utilities/navigation/navigation.ts"

export const usePackageSwitcher = () => {
  const translate = useTranslations("docsLayout")
  const pathname = usePathname()
  const router = useRouter()
  // "/packages/<パッケージ名>/..." の、"/packages/" 直後のセグメントだけを取り出す
  const [currentPackageName = ""] = pathname.replace("/packages/", "").split("/")
  const handleSelectPackage = (selectedValue: string) => {
    router.push(`/packages/${selectedValue}/`)
  }

  return {
    currentPackageName,
    handleSelectPackage,
    translate,
  }
}
