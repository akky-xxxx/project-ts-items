export const classify = (value: string) => {
  if (value === "a") {
    return "A"
  }
  if (value === "b") {
    return "B"
  }
  if (value === "c") {
    return "C"
  }
  if (value === "d") {
    return "D"
  }
  return "other"
}
