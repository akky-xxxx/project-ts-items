import { LOGO_IMAGE_PATHS } from "../LOGO_IMAGE_PATHS/LOGO_IMAGE_PATHS.ts"

import type { PackageName } from "../../types/PackageName/PackageName.ts"
import type { createTranslator, Messages } from "next-intl"

type PackageRecord = {
  description: Parameters<ReturnType<typeof createTranslator<Messages, "packages">>["rich"]>[0]
  logoImagePath: (typeof LOGO_IMAGE_PATHS)[keyof typeof LOGO_IMAGE_PATHS]
  name: PackageName
  versionText: string
}

export const PACKAGE_MASTER = {
  oxfmtConfig: {
    description: "oxfmt-config.description",
    logoImagePath: LOGO_IMAGE_PATHS.formatter,
    name: "oxfmt-config",
    versionText: "v1.0.0", // TODO: api で取得した値に置き換える
  },
  oxlintConfig: {
    description: "oxlint-config.description",
    logoImagePath: LOGO_IMAGE_PATHS.linter,
    name: "oxlint-config",
    versionText: "v1.0.0", // TODO: api で取得した値に置き換える
  },
} as const satisfies Record<string, PackageRecord>
