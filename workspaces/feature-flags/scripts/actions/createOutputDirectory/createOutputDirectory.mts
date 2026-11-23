import fs from "node:fs"

export const createOutputDirectory = (outputDirectory: string) => {
  fs.mkdirSync(outputDirectory, { recursive: true })
}
