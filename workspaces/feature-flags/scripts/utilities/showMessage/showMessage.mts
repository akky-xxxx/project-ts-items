type Type = "error" | "info"

export const showMessage = (type: Type, message: string) => {
  const logType = type === "error" ? "error" : "info"

  console[logType](message)
}
