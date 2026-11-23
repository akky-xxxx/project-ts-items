import { localFeatureFlag } from "../../../src/website/jsonOrigins/local/featureFlag.ts"
import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { PACKAGE_ROOT_DIRECTORY } from "../../constants/PACKAGE_ROOT_DIRECTORY/PACKAGE_ROOT_DIRECTORY.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

try {
  generateJson(localFeatureFlag, PACKAGE_ROOT_DIRECTORY)
  showMessage("info", "[info] generated featureFlag.json for local development")
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
