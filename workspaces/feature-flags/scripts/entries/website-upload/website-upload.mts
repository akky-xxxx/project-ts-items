import { uploadConfirm } from "../../actions/uploadConfirm/uploadConfirm.mts"
import { uploadJson } from "../../actions/uploadJson/uploadJson.mts"
import { uploadWebsiteJson } from "../../actions/uploadWebsiteJson/uploadWebsiteJson.mts"
import { OUTPUT_FILE_NAME } from "../../constants/OUTPUT_FILE_NAME/OUTPUT_FILE_NAME.mts"
import { showMessage } from "../../utilities/showMessage/showMessage.mts"

const upload = async () => {
  const { environment, isConfirmed } = await uploadConfirm()

  if (!isConfirmed) {
    showMessage("info", "[info] upload canceled")
    return
  }

  const { url } = await uploadWebsiteJson(environment, process.env, uploadJson)

  showMessage("info", `[info] uploaded dist/website/${environment}/${OUTPUT_FILE_NAME} to ${url}`)
}

try {
  await upload()
} catch (error: unknown) {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error)

  showMessage("error", `[error] ${detail}`)
  process.exitCode = 1
}
