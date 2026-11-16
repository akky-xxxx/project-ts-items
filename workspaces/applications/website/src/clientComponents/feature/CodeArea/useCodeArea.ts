import { startTransition, useCallback } from "react"
import { toast } from "react-hot-toast"

type Input = {
  copiedText: string
  copyTargetText: string | undefined
}

export const useCodeArea = (input: Input) => {
  const { copyTargetText, copiedText } = input

  const handleCopy = useCallback(() => {
    if (copyTargetText === undefined) {
      return
    }

    startTransition(async () => {
      await navigator.clipboard.writeText(copyTargetText).then(() => {
        toast(copiedText)
      })
    })
  }, [copiedText, copyTargetText])

  return { handleCopy }
}
