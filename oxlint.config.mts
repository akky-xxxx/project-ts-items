import { defineConfig } from "oxlint"

// TODO: 後で設定を最適化する
const config = defineConfig({
  categories: {
    correctness: "error",
    pedantic: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  env: {
    builtin: true,
  },
  overrides: [
    {
      files: ["./configurations/**", "./*.mts"],
      rules: {
        "no-nodejs-modules": "off",
      },
    },
    {
      files: ["./*.mts"],
      rules: {
        "no-default-export": "off",
      },
    },
  ],
  plugins: ["typescript", "unicorn", "oxc", "import"],
  rules: {
    "explicit-function-return-type": "off",
    "explicit-module-boundary-types": "off",
    "exports-last": "off",
    "filename-case": "off",
    "group-exports": "off",
    "id-length": [
      "error",
      {
        exceptions: ["v", "_"],
        min: 2,
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-namespace": [
      "error",
      {
        ignore: ["valibot"],
      },
    ],
    "new-cap": [
      "error",
      {
        capIsNewExceptions: ["Geist_Mono", "Geist"],
      },
    ],
    "no-console": "off",
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    "no-named-export": "off",
    "no-nested-ternary": "error",
    "no-null": "off",
    "no-rest-spread-properties": "off",
    "no-ternary": "off",
    "no-undefined": "off",
    "no-unneeded-ternary": "error",
    "no-warning-comments": "off",
    "one-var": "off",
    "oxc/no-async-await": "off",
    "oxc/no-optional-chaining": "off",
    "prefer-default-export": "off",
    "sort-imports": "off",
    "typescript/consistent-type-imports": [
      "error",
      {
        fixStyle: "separate-type-imports",
        prefer: "type-imports",
      },
    ],
    "typescript/explicit-member-accessibility": [
      "error",
      {
        accessibility: "no-public",
      },
    ],
    "typescript/parameter-properties": [
      "error",
      {
        prefer: "parameter-property",
      },
    ],
  },
})

export default config
