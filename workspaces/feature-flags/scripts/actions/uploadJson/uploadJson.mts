import { put } from "@vercel/blob"
import promises from "node:fs/promises"

import { OUTPUT_FILE_NAME } from "../../constants/OUTPUT_FILE_NAME/OUTPUT_FILE_NAME.mts"
import { UPLOAD_OPTIONS } from "../../constants/UPLOAD_OPTIONS/UPLOAD_OPTIONS.mts"

export const uploadJson = async (filePath: string, token: string) => {
  const file = await promises.readFile(filePath)

  return put(OUTPUT_FILE_NAME, file, {
    ...UPLOAD_OPTIONS,
    token,
  })
}
