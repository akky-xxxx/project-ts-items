import { http, HttpResponse } from "msw"

import { PACKAGE_NAMES } from "../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { SearchResultsResponse } from "../../generated/npmRegistry/npmRegistry.ts"

/**
 * @description
 * npm Registry API のモック。search は、このリポジトリのパッケージを返す
 */
export const npmRegistryHandlers = [
  http.get("https://registry.npmjs.org/-/v1/search", () =>
    HttpResponse.json({
      objects: Object.values(PACKAGE_NAMES).map((packageName) => ({
        package: { name: `${PROJECT_NAME}/${packageName}` },
      })),
    } satisfies SearchResultsResponse),
  ),
]
