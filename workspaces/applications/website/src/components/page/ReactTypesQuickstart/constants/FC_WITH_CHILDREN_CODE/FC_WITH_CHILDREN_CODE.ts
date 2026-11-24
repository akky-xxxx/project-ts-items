export const FC_WITH_CHILDREN_CODE = `import type { FcWithChildren } from "@ts-items/react-types"

type Props = {
  title: string
}

const Layout: FcWithChildren<Props> = (props) => {
  const { children, title } = props

  return (
    <section>
      <h1>{title}</h1>

      {children}
    </section>
  )
}`
