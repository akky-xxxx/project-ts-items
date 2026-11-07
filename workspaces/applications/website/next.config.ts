import createNextIntlPlugin from "next-intl/plugin"

import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin()

const nextConfig = {} satisfies NextConfig

export default withNextIntl(nextConfig)
