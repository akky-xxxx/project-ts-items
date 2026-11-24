import { LOGO_IMAGE_PATHS } from "../LOGO_IMAGE_PATHS/LOGO_IMAGE_PATHS.ts"

import type { PackageName } from "../../types/PackageName/PackageName.ts"
import type { createTranslator, Messages } from "next-intl"

type PackageRecord = {
  description: Parameters<ReturnType<typeof createTranslator<Messages, "packages">>["rich"]>[0]
  logoImagePath: (typeof LOGO_IMAGE_PATHS)[keyof typeof LOGO_IMAGE_PATHS]
  name: PackageName
}

export const PACKAGE_MASTER = {
  "oxfmt-config": {
    description: "oxfmt-config.description",
    logoImagePath: LOGO_IMAGE_PATHS.formatter,
    name: "oxfmt-config",
  },
  "oxlint-config": {
    description: "oxlint-config.description",
    logoImagePath: LOGO_IMAGE_PATHS.linter,
    name: "oxlint-config",
  },
  "react-types": {
    description: "react-types.description",
    logoImagePath: LOGO_IMAGE_PATHS.types,
    name: "react-types",
  },
} as const satisfies Record<PackageName, PackageRecord>
