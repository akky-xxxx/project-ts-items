/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-alphabetical-order"],
  ignoreFiles: [
    "**/reset.css",
    // 生成物(build-storybook・vitest の coverage の出力。.gitignore 済みで、stylelint は .gitignore を読まない)
    "coverage/**",
    "storybook-static/**",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      { message: (selector) => `Expected class selector "${selector}" to be camelCase` },
    ],
  },
}
