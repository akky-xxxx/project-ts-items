import { CheckedIcon } from "./CheckedIcon/CheckedIcon.tsx"
import { CommandIcon } from "./CommandIcon/CommandIcon.tsx"
import { DEFAULT_SIZE } from "./constants/DEFAULT_SIZE/DEFAULT_SIZE.ts"
import { GitHubIcon } from "./GitHubIcon/GitHubIcon.tsx"
import { LanguageIcon } from "./LanguageIcon/LanguageIcon.tsx"
import { MoonIcon } from "./MoonIcon/MoonIcon.tsx"
import { SearchIcon } from "./SearchIcon/SearchIcon.tsx"
import { SunIcon } from "./SunIcon/SunIcon.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { FC, SVGAttributes } from "react"

const WrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
} as const

const IconSize = {
  height: 60,
  width: 60,
} as const

type Props = Pick<SVGAttributes<unknown>, "height" | "width">

const Icons: FC<Props> = (props) => (
  <div style={WrapperStyle}>
    <CheckedIcon {...IconSize} {...props} />
    <CommandIcon {...IconSize} {...props} />
    <GitHubIcon {...IconSize} {...props} />
    <LanguageIcon {...IconSize} {...props} />
    <MoonIcon {...IconSize} {...props} />
    <SearchIcon {...IconSize} {...props} />
    <SunIcon {...IconSize} {...props} />
  </div>
)

const meta = {
  component: Icons,

  argTypes: {
    height: { control: "number" },
    width: { control: "number" },
  },
  args: {
    height: DEFAULT_SIZE,
    width: DEFAULT_SIZE,
  },
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {}
