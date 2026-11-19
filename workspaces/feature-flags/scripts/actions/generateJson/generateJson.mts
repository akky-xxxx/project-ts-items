import fs from "node:fs"
import path from "node:path"

const FILE_NAME = "featureFlag.json"
const INDENT_SIZE = 2

export const generateJson = async (jsonPath: string) => {
  const module: unknown = await import(jsonPath)
  const jsonData = JSON.stringify(module, null, INDENT_SIZE)
  const packageRootDirectory = path.resolve(import.meta.dirname, "../../../")

  fs.writeFileSync(path.resolve(packageRootDirectory, FILE_NAME), jsonData)
}
