import { getTranslations } from "next-intl/server"

import { Home } from "../../components/page/Home/Home.tsx"
import { buildPackageCardItems } from "../../utilities/buildPackageCardItems/buildPackageCardItems.ts"
import { renderLineBreak } from "../../utilities/renderLineBreak/renderLineBreak.tsx"

import type { ReactNode } from "react"

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packageTranslate, breadcrumbTranslate, packageCardTranslate] =
    await Promise.all([
      getTranslations("pages.home"),
      getTranslations("packages"),
      getTranslations("components.ui.breadcrumb"),
      getTranslations("components.ui.packageCard"),
    ])
  const pageTitleText = pageTranslate("pageTitle")

  return (
    <Home
      breadcrumbItems={[]}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      packageTitleText={pageTranslate("packageTitleText")}
      packages={buildPackageCardItems({ packageCardTranslate, packageTranslate }, "h3")}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitleText={pageTitleText}
    />
  )
}

export default Page
