/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-alphabetical-order"],
  ignoreFiles: ["**/reset.css"],
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      { message: (selector) => `Expected class selector "${selector}" to be camelCase` },
    ],
  },
}
