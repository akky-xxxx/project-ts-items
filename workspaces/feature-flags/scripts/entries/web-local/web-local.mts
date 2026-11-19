import path from "node:path"

import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { INDENT_SIZE } from "../../constants/INDENT_SIZE/INDENT_SIZE.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

const JSON_ORIGIN_PATH = path.resolve(
  import.meta.dirname,
  "../../../src/website/jsonOrigins/local/featureFlag.ts",
)
try {
  await generateJson(JSON_ORIGIN_PATH)
  showMessage("info", "[info] generated featureFlag.json for local development")
} catch (error: unknown) {
  showMessage("error", `[error] ${JSON.stringify(error, null, INDENT_SIZE)}`)
}
