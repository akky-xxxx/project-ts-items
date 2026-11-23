import { select, confirm } from "@inquirer/prompts"

export const uploadConfirm = async () => {
  const environment = await select({
    choices: [
      { name: "Staging", value: "stg" },
      { name: "Production", value: "prd" },
    ],
    message: "アップロード先の環境を選択",
  })

  const isConfirmed = await confirm({
    default: false,
    message: `${environment} にアップロードしますか？`,
  })

  return { environment, isConfirmed }
}
