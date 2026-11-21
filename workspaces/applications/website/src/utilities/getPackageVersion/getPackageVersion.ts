import { HTTP_STATUS_OK } from "../../constants/HTTP_STATUS_OK/HTTP_STATUS_OK.ts"
import { getPackageLatestVersion } from "../../generated/npmRegistryPackage/npmRegistryPackage.ts"

import type { PackageName } from "../../types/PackageName/PackageName.ts"

const FALLBACK_VERSION = "---"
const ONE_HOUR = 3600

export const getPackageVersion = async (packageName: PackageName) => {
  try {
    const result = await getPackageLatestVersion(packageName, { next: { revalidate: ONE_HOUR } })
    if (result.status !== HTTP_STATUS_OK) {
      return FALLBACK_VERSION
    }
    return result.data.version
  } catch {
    return FALLBACK_VERSION
  }
}
