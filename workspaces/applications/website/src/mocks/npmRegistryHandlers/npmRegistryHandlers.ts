import { http, HttpResponse } from "msw"

import { PACKAGE_NAMES } from "../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { getNpmRegistryBaseUrl } from "../../utilities/getNpmRegistryBaseUrl/getNpmRegistryBaseUrl.ts"

import type { SearchResultsResponse } from "../../generated/npmRegistry/npmRegistry.ts"

/**
 * @description
 * npm Registry API のモック。search は、このリポジトリのパッケージ名の末尾に -mock を付けて返す(実際の結果と見分けるため)。
 * リクエスト先は、生成した client と同じく環境変数 NPM_REGISTRY_BASE_URL に合わせる
 */
export const npmRegistryHandlers = [
  http.get(`${getNpmRegistryBaseUrl()}/-/v1/search`, () =>
    HttpResponse.json({
      objects: Object.values(PACKAGE_NAMES).map((packageName) => ({
        package: { name: `${PROJECT_NAME}/${packageName}-mock` },
      })),
    } satisfies SearchResultsResponse),
  ),
]
