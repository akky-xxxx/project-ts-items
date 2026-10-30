import fs from "node:fs"
import path from "node:path"

import { workspaces } from "../../../package.json"

const ROOT_DIRECTORY = path.resolve(import.meta.dirname, "../../..")

const PACKAGE_NAMES = fs
  .globSync(workspaces, { cwd: ROOT_DIRECTORY })
  .map((workspace) => path.basename(workspace))

export const directories = ["root", "*", "packages", ...PACKAGE_NAMES]
