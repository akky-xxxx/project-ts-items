import type { KnipConfig } from "knip"

export default {
  ignore: ["workspaces/**"],
  // Homebrew で入れる Infisical CLI(npm の依存ではない)
  ignoreBinaries: ["infisical"],
} as const satisfies KnipConfig
