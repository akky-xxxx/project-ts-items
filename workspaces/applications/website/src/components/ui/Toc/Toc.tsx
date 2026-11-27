import { useTranslations } from "next-intl"

import { TocList } from "./clientComponents/TocList/TocList.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  items: ComponentProps<typeof TocList>["items"]
}

export const Toc: FC<Props> = (props) => {
  const { items } = props
  const docsLayoutTranslate = useTranslations("docsLayout")

  return (
    <nav aria-label={docsLayoutTranslate("toc")}>
      <p>{docsLayoutTranslate("toc")}</p>

      <TocList items={items} />
    </nav>
  )
}
