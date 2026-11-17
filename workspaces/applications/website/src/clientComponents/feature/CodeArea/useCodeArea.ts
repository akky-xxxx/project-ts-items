import { useTranslations } from "next-intl"
import { startTransition, useCallback } from "react"
import { toast } from "react-hot-toast"

type Input = {
  copyTargetText: string | undefined
}

export const useCodeArea = (input: Input) => {
  const { copyTargetText } = input
  const codeAreaTranslate = useTranslations("components.ui.codeArea")
  const copiedText = codeAreaTranslate("copiedText")
  const copyButtonLabelText = codeAreaTranslate("copyButtonLabelText")

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

  return { copyButtonLabelText, handleCopy }
}
