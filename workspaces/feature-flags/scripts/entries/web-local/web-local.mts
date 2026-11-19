import { localFeatureFlag } from "../../../src/website/jsonOrigins/local/featureFlag.ts"
import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

try {
  generateJson(localFeatureFlag)
  showMessage("info", "[info] generated featureFlag.json for local development")
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
