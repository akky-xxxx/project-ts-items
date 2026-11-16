import type { SourceKey } from "../SourceKey/SourceKey.ts"
import type { ReactNode } from "react"

/** ベースとスイッチの全組み合わせについて、設定ファイルのコードと、それを描画した CodeBlock を持つマップ */
export type CodeBlockMap = Record<SourceKey, { code: string; codeBlock: ReactNode }>
