import path from "node:path"

import { prdFeatureFlag } from "../../../src/website/jsonOrigins/prd/featureFlag.ts"
import { createOutputDirectory } from "../../actions/createOutputDirectory/createOutputDirectory.mts"
import { generateJson } from "../../actions/generateJson/generateJson.mts"
import { PACKAGE_ROOT_DIRECTORY } from "../../constants/PACKAGE_ROOT_DIRECTORY/PACKAGE_ROOT_DIRECTORY.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

try {
  const outputDirectory = path.resolve(PACKAGE_ROOT_DIRECTORY, "dist/website/prd")

  createOutputDirectory(outputDirectory)
  generateJson(prdFeatureFlag, outputDirectory)
  showMessage("info", "[info] generated dist/website/prd/featureFlag.json for prd")
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
