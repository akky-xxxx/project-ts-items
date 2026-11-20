const VARIABLE_NAMES = {
  prd: "BLOB_READ_WRITE_TOKEN_PRD",
  stg: "BLOB_READ_WRITE_TOKEN_STG",
} as const

export const getBlobToken = (
  environment: keyof typeof VARIABLE_NAMES,
  environmentVariables: Record<string, string | undefined>,
) => {
  const variableName = VARIABLE_NAMES[environment]
  const token = environmentVariables[variableName]

  if (token === undefined || token === "") {
    throw new Error(`${variableName} is not defined.`)
  }

  return token
}
