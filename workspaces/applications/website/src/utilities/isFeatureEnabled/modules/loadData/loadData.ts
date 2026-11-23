import { featureFlagSchema } from "@ts-items/feature-flags/website"

import { fetchJson } from "./modules/fetchJson/fetchJson.ts"
import { readJson } from "./modules/readJson/readJson.ts"

/**
 * @description
 * 環境変数 FEATURE_FLAG_URL が指す feature flag の json を読み込み、スキーマでパースして返す。
 * https:// で始まる場合は Vercel Blob ストアの base URL とみなし、その直下の featureFlag.json を取得する。
 * それ以外は実行時のカレントディレクトリからの json ファイルのパスとみなして読み込む。
 * 未設定・取得失敗・スキーマ不一致のときは reject する
 */
export const loadData = async () => {
  const featureFlagUrl = process.env.FEATURE_FLAG_URL

  if (featureFlagUrl === undefined || featureFlagUrl === "") {
    throw new Error("FEATURE_FLAG_URL is not defined")
  }

  const json = featureFlagUrl.startsWith("https://")
    ? await fetchJson(featureFlagUrl)
    : await readJson(featureFlagUrl)

  return featureFlagSchema.parse(json)
}
