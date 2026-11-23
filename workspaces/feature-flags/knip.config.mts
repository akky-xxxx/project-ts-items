import type { KnipConfig } from "knip"

export default {
  // Infisical CLI の infisical run 経由で実行する upload:website の入口。knip は `--` 以降のコマンドを解釈しないため明示する
  entry: ["**/*.test.mts", "scripts/entries/website-upload/website-upload.mts"],
  // Homebrew で入れる Infisical CLI(npm の依存ではない)
  ignoreBinaries: ["infisical"],
} as const satisfies KnipConfig
