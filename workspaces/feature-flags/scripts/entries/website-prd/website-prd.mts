import { prdFeatureFlag } from "../../../src/website/jsonOrigins/prd/featureFlag.ts"
import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

try {
  generateJson(prdFeatureFlag)
  showMessage("info", "[info] generated featureFlag.json for prd development")
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
