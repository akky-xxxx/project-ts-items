import path from "node:path"

import { OUTPUT_FILE_NAME } from "../../constants/OUTPUT_FILE_NAME/OUTPUT_FILE_NAME.mts"
import { PACKAGE_ROOT_DIRECTORY } from "../../constants/PACKAGE_ROOT_DIRECTORY/PACKAGE_ROOT_DIRECTORY.mts"
import { getBlobToken } from "../../utilities/getBlobToken/getBlobToken.mts"

type Upload = (filePath: string, token: string) => Promise<{ url: string }>

export const uploadWebsiteJson = async (
  environment: Parameters<typeof getBlobToken>[0],
  environmentVariables: Record<string, string | undefined>,
  upload: Upload,
) => {
  const token = getBlobToken(environment, environmentVariables)
  const filePath = path.resolve(
    PACKAGE_ROOT_DIRECTORY,
    `dist/website/${environment}`,
    OUTPUT_FILE_NAME,
  )

  return upload(filePath, token)
}
