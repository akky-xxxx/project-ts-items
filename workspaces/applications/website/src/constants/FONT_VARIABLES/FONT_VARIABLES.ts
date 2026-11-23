import { JetBrains_Mono, Noto_Sans_JP } from "next/font/google"

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})
const notoSans = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const FONT_VARIABLES = [jetBrainsMono.variable, notoSans.variable] as const
