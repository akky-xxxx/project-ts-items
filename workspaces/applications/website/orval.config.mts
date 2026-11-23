import { defineConfig } from "orval"

import { GITHUB_REST_API_VERSION } from "./src/constants/GITHUB_REST_API_VERSION/GITHUB_REST_API_VERSION.ts"

import type { OutputOptions } from "orval"

/** GitHub REST API の OpenAPI 定義(github/rest-api-description)の取得元のコミット。定義を更新するときに書き換える */
const GITHUB_REST_DESCRIPTION_COMMIT = "c9c95fe34ced05fe076001f5c55704742bc8e7f8"

/** 出力設定のうち、npm registry の各定義で共通のもの */
const npmRegistryOutput = {
  // リクエストのたびに呼び、起動時の環境変数でリクエスト先を切り替える
  baseUrl: {
    imports: [
      {
        importPath: "../../utilities/getNpmRegistryBaseUrl/getNpmRegistryBaseUrl.ts",
        name: "getNpmRegistryBaseUrl",
      },
    ],
    runtime: "getNpmRegistryBaseUrl()",
  },
  clean: true,
  client: "fetch",
  mode: "single",
} satisfies OutputOptions

export default defineConfig({
  gitHubRest: {
    input: {
      // 使う operation だけを生成する(全件だと生成物が数 MB になる)。使う endpoint を増やすときはここに追記する
      filters: {
        operationIds: ["repos/list-commits", "repos/list-releases"],
      },
      // 生成結果が変わらないよう、取得元のコミットを固定する。ヘッダーで送る版と同じ版のファイルを参照する
      target: `https://raw.githubusercontent.com/github/rest-api-description/${GITHUB_REST_DESCRIPTION_COMMIT}/descriptions/api.github.com/api.github.com.${GITHUB_REST_API_VERSION}.json`,
    },
    output: {
      // リクエストのたびに呼び、起動時の環境変数でリクエスト先を切り替える
      baseUrl: {
        imports: [
          {
            importPath: "../../utilities/getGitHubRestBaseUrl/getGitHubRestBaseUrl.ts",
            name: "getGitHubRestBaseUrl",
          },
        ],
        runtime: "getGitHubRestBaseUrl()",
      },
      clean: true,
      client: "fetch",
      mode: "single",
      override: {
        components: {
          // 定義の schema 名(Commit、Release 等)が汎用的なため、出どころが分かるよう接頭辞を付ける
          schemas: {
            prefix: "GitHub",
          },
        },
        // 推奨ヘッダーと認証ヘッダーを付ける
        mutator: {
          name: "gitHubRestFetch",
          path: "./src/utilities/gitHubRestFetch/gitHubRestFetch.ts",
        },
      },
      target: "./src/generated/gitHubRest/gitHubRest.ts",
    },
  },
  npmRegistry: {
    input: {
      target: "./openapi/npmRegistry/openapi.json",
    },
    output: {
      ...npmRegistryOutput,
      target: "./src/generated/npmRegistry/npmRegistry.ts",
    },
  },
  // 公式の定義に無い、パッケージ取得の endpoint を手書きで定義したもの
  npmRegistryPackage: {
    input: {
      target: "./openapi/npmRegistryPackage/openapi.json",
    },
    output: {
      ...npmRegistryOutput,
      target: "./src/generated/npmRegistryPackage/npmRegistryPackage.ts",
    },
  },
})
