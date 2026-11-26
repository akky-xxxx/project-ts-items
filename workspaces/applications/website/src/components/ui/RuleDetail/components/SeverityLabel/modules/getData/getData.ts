const WARN = 1
const ERROR = 2

const convertNumberToSeverity = (input: number) => {
  if (input === WARN) {
    return "warn"
  }
  if (input === ERROR) {
    return "error"
  }
  return "off"
}

type Output = {
  color: `--color-severity-${string}`
  text: Uppercase<string>
}

export const getData = (severity: unknown): Output => {
  if (typeof severity === "number") {
    return getData(convertNumberToSeverity(severity))
  }

  switch (severity) {
    case "allow": {
      return {
        color: "--color-severity-allow",
        text: "ALLOW",
      }
    }
    case "deny":
    case "error": {
      return {
        color: "--color-severity-error",
        text: "ERROR",
      }
    }
    case "warn": {
      return {
        color: "--color-severity-warn",
        text: "WARN",
      }
    }
    case "off": {
      return {
        color: "--color-severity-off",
        text: "OFF",
      }
    }
    default: {
      return {
        color: "--color-severity-off",
        text: "UNKNOWN",
      }
    }
  }
}
