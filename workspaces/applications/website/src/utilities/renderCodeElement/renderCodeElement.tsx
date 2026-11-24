import type { ReactNode } from "react"

/** T.rich の `<code></code>` タグに渡すインラインコードの renderer */
export const renderCodeElement = (chunks: ReactNode) => <code className="code">{chunks}</code>
