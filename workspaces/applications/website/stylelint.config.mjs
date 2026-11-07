/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-alphabetical-order"],
  ignoreFiles: ["**/reset.module.css"],
  plugins: ["stylelint-order"],
}
