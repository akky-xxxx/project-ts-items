import { HTTP_STATUS_OK } from "../../constants/HTTP_STATUS_OK/HTTP_STATUS_OK.ts"
import { NPM_SEARCH_TEXT } from "../../constants/NPM_SEARCH_TEXT/NPM_SEARCH_TEXT.ts"
import { getsearch } from "../../generated/npmRegistry/npmRegistry.ts"

/**
 * @description
 * npm の search で、このリポジトリの scope を検索し、結果のパッケージ名を返す。
 * 取得に失敗したとき(200 以外の status、通信エラー、JSON でない応答)は、空の配列を返す。
 * 名前の無い検索結果は含めない
 */
export const searchPackageNames = async (): Promise<string[]> => {
  try {
    const response = await getsearch({ text: NPM_SEARCH_TEXT })
    if (response.status !== HTTP_STATUS_OK) {
      return []
    }
    return (response.data.objects ?? []).flatMap((item) => item.package?.name ?? [])
  } catch {
    return []
  }
}
