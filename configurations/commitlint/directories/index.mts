import { globSync } from "fs"
import { basename } from "path"

import { workspaces } from "../../../package.json"

const PACKAGE_NAMES = globSync(workspaces).map(((workspace) => basename(workspace)))

export const directories = ["root", "*", "packages", ...PACKAGE_NAMES]
