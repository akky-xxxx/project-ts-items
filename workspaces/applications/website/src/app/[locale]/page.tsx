import { getTranslations } from "next-intl/server"

import type { ReactNode } from "react"

const Page = async (): Promise<ReactNode> => {
  const translate = await getTranslations("HomePage")

  return <div>{translate("greeting")}</div>
}

export default Page
