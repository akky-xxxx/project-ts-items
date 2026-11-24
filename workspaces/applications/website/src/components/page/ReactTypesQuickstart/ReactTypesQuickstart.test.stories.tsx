import { Fragment } from "react"
import { toast, Toaster } from "react-hot-toast"
import { expect, spyOn, userEvent, waitFor, within } from "storybook/test"

import meta, { En } from "./ReactTypesQuickstart.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>
type HeadingCase = {
  level: number
  name: string
}
type InstallTabCase = {
  command: string
  tabLabelText: string
}
type TypeRecordCase = {
  code: string
  typeName: string
}

const EXPECTED_CUSTOM_CSS_PROPERTIES_CODE = [
  'import type { CustomCSSProperties } from "@ts-items/react-types"',
  "",
  "const Box = () => {",
  '  const style: CustomCSSProperties = { "--gap": 8, "color": "red" }',
  "",
  "  return <div style={style}>Hello World</div>",
  "}",
].join("\n")

const EXPECTED_FC_WITH_CHILDREN_CODE = [
  'import type { FcWithChildren } from "@ts-items/react-types"',
  "",
  "type Props = {",
  "  title: string",
  "}",
  "",
  "const Layout: FcWithChildren<Props> = (props) => {",
  "  const { children, title } = props",
  "",
  "  return (",
  "    <section>",
  "      <h1>{title}</h1>",
  "",
  "      {children}",
  "    </section>",
  "  )",
  "}",
].join("\n")

/** 見出しを起点に、その見出しの Section を取得する */
const getSectionByHeading = (canvasElement: HTMLElement, headingCase: HeadingCase): HTMLElement => {
  const { level, name } = headingCase
  const headingElement = within(canvasElement).getByRole("heading", { level, name })
  const sectionElement = headingElement.closest("section")
  if (!sectionElement) {
    throw new Error(`${name} の Section が見つからない`)
  }
  return sectionElement
}

/** 型名の h3 を起点に、その型の Section を取得する */
const getTypeRecordSection = (canvasElement: HTMLElement, typeName: string): HTMLElement =>
  getSectionByHeading(canvasElement, { level: 3, name: typeName })

/** Installation の h2 を起点に、インストール節の Section を取得する */
const getInstallSection = (canvasElement: HTMLElement): HTMLElement =>
  getSectionByHeading(canvasElement, { level: 2, name: "Installation" })

/** タブを選ぶと、そのパッケージマネージャー用のコマンドが表示・コピーされることを検証する */
const createInstallTabStory = (installTabCase: InstallTabCase): Story => ({
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const { command, tabLabelText } = installTabCase
    const sectionElement = getInstallSection(canvasElement)
    const section = within(sectionElement)
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(section.getByRole("button", { name: tabLabelText }))
      await waitFor(async () => {
        const codeTexts = [...sectionElement.querySelectorAll("pre > code")].map(
          (element) => element.textContent,
        )
        await expect(codeTexts).toStrictEqual([command])
      })
      await userEvent.click(section.getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith(command)
    } finally {
      writeTextSpy.mockRestore()
    }
  },
})

/** 型ごとのコードの描画を検証する */
const createTypeRecordCodeStory = (typeRecordCase: TypeRecordCase): Story => ({
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const { code, typeName } = typeRecordCase
    const sectionElement = getTypeRecordSection(canvasElement, typeName)
    const codeElement = sectionElement.querySelector("pre > code")
    await expect(codeElement?.textContent).toBe(code)
  },
})

/** 型ごとのコードの Copy で、そのコードがクリップボードに渡りトーストが出ることを検証する */
const createTypeRecordCopyStory = (typeRecordCase: TypeRecordCase): Story => ({
  ...En,
  // トーストの状態はモジュール単位で共有されるため、前の story のトーストを消してから検証する
  beforeEach: () => {
    toast.remove()
  },
  // ページでは RootLayout が Toaster を描画するため、コピー完了のトーストの検証用に追加する
  decorators: [
    (Story) => (
      <Fragment>
        <Story />
        <Toaster />
      </Fragment>
    ),
  ],
  play: async (context) => {
    const { canvasElement } = context
    const { code, typeName } = typeRecordCase
    const sectionElement = getTypeRecordSection(canvasElement, typeName)
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(within(sectionElement).getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith(code)
      await expect(await within(canvasElement).findByText("Copied")).toBeInTheDocument()
    } finally {
      writeTextSpy.mockRestore()
    }
  },
})

export const TestForHeadingStructure: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const getHeadingTexts = (level: number) =>
      canvas.getAllByRole("heading", { level }).map((element) => element.textContent)
    await expect(getHeadingTexts(1)).toStrictEqual(["Quickstart"])
    await expect(getHeadingTexts(2)).toStrictEqual(["Installation", "Usage"])
    await expect(getHeadingTexts(3)).toStrictEqual(["CustomCSSProperties", "FcWithChildren"])
  },
}

export const TestForBreadcrumbLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForBreadcrumbPackagesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const linkElement = within(navigationElement).getByRole("link", { name: "Packages" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForBreadcrumbReactTypesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const linkElement = within(navigationElement).getByRole("link", { name: "react-types" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/react-types/")
  },
}

export const TestForBreadcrumbCurrentPage: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const currentPageElement = within(navigationElement).getByText("Quickstart")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}

export const TestForCopyButtonLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    // Install の Tab と、型ごとの CodeArea(2つ)にそれぞれ1つずつある
    await expect(canvas.getAllByRole("button", { name: "Copy" })).toHaveLength(3)
  },
}

export const TestForInstallNote: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const noteElement = getInstallSection(canvasElement).querySelector("p")
    const inlineCodeTexts = [...(noteElement?.querySelectorAll("code") ?? [])].map(
      (element) => element.textContent,
    )
    await expect(inlineCodeTexts).toStrictEqual(["@types/react", "typescript"])
    await expect(noteElement?.textContent).toBe(
      "Your project needs @types/react 18 or later and typescript 5.0 or later.",
    )
  },
}

export const TestForInstallNpm = createInstallTabStory({
  command: "npm i -D @ts-items/react-types",
  tabLabelText: "npm",
})

export const TestForInstallYarn = createInstallTabStory({
  command: "yarn add -D @ts-items/react-types",
  tabLabelText: "yarn",
})

export const TestForInstallPnpm = createInstallTabStory({
  command: "pnpm add -D @ts-items/react-types",
  tabLabelText: "pnpm",
})

export const TestForInstallBun = createInstallTabStory({
  command: "bun add -D @ts-items/react-types",
  tabLabelText: "bun",
})

export const TestForDescriptionCode: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const getInlineCodeTexts = (typeName: string) =>
      [...getTypeRecordSection(canvasElement, typeName).querySelectorAll("p > code")].map(
        (element) => element.textContent,
      )
    await expect(getInlineCodeTexts("CustomCSSProperties")).toStrictEqual(["CSSProperties"])
    await expect(getInlineCodeTexts("FcWithChildren")).toStrictEqual(["FC", "children"])
  },
}

export const TestForCustomCSSPropertiesCode = createTypeRecordCodeStory({
  code: EXPECTED_CUSTOM_CSS_PROPERTIES_CODE,
  typeName: "CustomCSSProperties",
})

export const TestForCustomCSSPropertiesCopy = createTypeRecordCopyStory({
  code: EXPECTED_CUSTOM_CSS_PROPERTIES_CODE,
  typeName: "CustomCSSProperties",
})

export const TestForFcWithChildrenCode = createTypeRecordCodeStory({
  code: EXPECTED_FC_WITH_CHILDREN_CODE,
  typeName: "FcWithChildren",
})

export const TestForFcWithChildrenCopy = createTypeRecordCopyStory({
  code: EXPECTED_FC_WITH_CHILDREN_CODE,
  typeName: "FcWithChildren",
})
