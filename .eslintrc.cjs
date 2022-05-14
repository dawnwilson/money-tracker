/* eslint-env node */
module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "vue/script-setup-uses-vars": "off",
  },
};
