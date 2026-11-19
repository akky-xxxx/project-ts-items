type Type = "error" | "info"

export const showMessage = (type: Type, message: string) => {
  console[type](message)
}
