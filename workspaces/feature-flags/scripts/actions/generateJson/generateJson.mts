import fs from "node:fs"
import path from "node:path"

import { INDENT_SIZE } from "../../constants/INDENT_SIZE/INDENT_SIZE.mts"

const FILE_NAME = "featureFlag.json"

export const generateJson = async (jsonPath: string) => {
  const module: unknown = await import(jsonPath)
  const jsonData = JSON.stringify(module, null, INDENT_SIZE)
  const packageRootDirectory = path.resolve(import.meta.dirname, "../../../")

  fs.writeFileSync(path.resolve(packageRootDirectory, FILE_NAME), jsonData)
}
