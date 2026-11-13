import createNextIntlPlugin from "next-intl/plugin"

import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  trailingSlash: true,
} satisfies NextConfig

export default withNextIntl(nextConfig)
