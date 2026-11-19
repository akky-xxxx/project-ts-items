import fs from "node:fs"
import path from "node:path"

import { createFeatureFlagJson } from "../../utilities/createFeatureFlagJson/createFeatureFlagJson.mts"

import type { FeatureFlag } from "../../../src/website/types/FeatureFlag/FeatureFlag.ts"

const FILE_NAME = "featureFlag.json"

export const generateJson = (featureFlag: FeatureFlag) => {
  const jsonData = createFeatureFlagJson(featureFlag)
  const packageRootDirectory = path.resolve(import.meta.dirname, "../../../")

  fs.writeFileSync(path.resolve(packageRootDirectory, FILE_NAME), jsonData)
}
