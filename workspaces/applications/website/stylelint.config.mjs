/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-alphabetical-order"],
  ignoreFiles: ["**/reset.css"],
  plugins: ["stylelint-order"],
}
