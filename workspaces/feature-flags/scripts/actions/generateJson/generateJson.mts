import fs from "node:fs"
import path from "node:path"

import { OUTPUT_FILE_NAME } from "../../constants/OUTPUT_FILE_NAME/OUTPUT_FILE_NAME.mts"
import { createFeatureFlagJson } from "../../utilities/createFeatureFlagJson/createFeatureFlagJson.mts"

import type { FeatureFlag } from "../../../src/website/types/FeatureFlag/FeatureFlag.ts"

export const generateJson = (featureFlag: FeatureFlag, outputDirectory: string) => {
  const jsonData = createFeatureFlagJson(featureFlag)

  fs.writeFileSync(path.resolve(outputDirectory, OUTPUT_FILE_NAME), jsonData)
}
