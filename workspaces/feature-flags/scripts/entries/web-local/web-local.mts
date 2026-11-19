import path from "node:path"

import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

const JSON_ORIGIN_PATH = path.resolve(
  import.meta.dirname,
  "../../../src/website/jsonOrigins/local/featureFlag.ts",
)
try {
  await generateJson(JSON_ORIGIN_PATH)
  showMessage("info", "[info] generated featureFlag.json for local development")
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
