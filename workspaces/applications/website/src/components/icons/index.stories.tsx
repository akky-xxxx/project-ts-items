import { CheckedIcon } from "./CheckedIcon/CheckedIcon.tsx"
import { CommandIcon } from "./CommandIcon/CommandIcon.tsx"
import { DEFAULT_SIZE } from "./constants/DEFAULT_SIZE/DEFAULT_SIZE.ts"
import { CopyIcon } from "./CopyIcon/CopyIcon.tsx"
import { CrossIcon } from "./CrossIcon/CrossIcon.tsx"
import { GearIcon } from "./GearIcon/GearIcon.tsx"
import { HamburgerIcon } from "./HamburgerIcon/HamburgerIcon.tsx"
import { LanguageIcon } from "./LanguageIcon/LanguageIcon.tsx"
import { MoonIcon } from "./MoonIcon/MoonIcon.tsx"
import { SearchIcon } from "./SearchIcon/SearchIcon.tsx"
import { SunIcon } from "./SunIcon/SunIcon.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { FC, SVGAttributes } from "react"

const WRAPPER_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
} as const

const ICON_SIZE = {
  height: 60,
  width: 60,
} as const

type Props = Pick<SVGAttributes<unknown>, "height" | "width">

const Icons: FC<Props> = (props) => (
  <div style={WRAPPER_STYLE}>
    <CheckedIcon {...ICON_SIZE} {...props} />
    <CommandIcon {...ICON_SIZE} {...props} />
    <CopyIcon {...ICON_SIZE} {...props} />
    <CrossIcon {...ICON_SIZE} {...props} />
    <GearIcon {...ICON_SIZE} {...props} />
    <HamburgerIcon {...ICON_SIZE} {...props} />
    <LanguageIcon {...ICON_SIZE} {...props} />
    <MoonIcon {...ICON_SIZE} {...props} />
    <SearchIcon {...ICON_SIZE} {...props} />
    <SunIcon {...ICON_SIZE} {...props} />
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
