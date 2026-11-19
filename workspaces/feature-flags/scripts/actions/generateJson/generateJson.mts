import fs from "node:fs"
import path from "node:path"

import { OUTPUT_FILE_NAME } from "../../constants/OUTPUT_FILE_NAME/OUTPUT_FILE_NAME.mts"
import { createFeatureFlagJson } from "../../utilities/createFeatureFlagJson/createFeatureFlagJson.mts"

import type { FeatureFlag } from "../../../src/website/types/FeatureFlag/FeatureFlag.ts"

export const generateJson = (featureFlag: FeatureFlag) => {
  const jsonData = createFeatureFlagJson(featureFlag)
  const packageRootDirectory = path.resolve(import.meta.dirname, "../../../")

  fs.writeFileSync(path.resolve(packageRootDirectory, OUTPUT_FILE_NAME), jsonData)
}
