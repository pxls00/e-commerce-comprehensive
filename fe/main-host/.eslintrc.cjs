/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // lines for vue eslint config
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/html-indent": [ "error", 2 ],
    "no-multi-spaces": [ "error" ],

    // lines for simple eslint config
    "no-unused-vars": [
      "error",
      {
        args: "none",
      },
    ],
    semi: [ "error", "always" ], // use ;
    quotes: [ "error", "double" ], // use "
    indent: [ "error", 2, { SwitchCase: 1 } ],
    "no-multiple-empty-lines": [
      "error",
      {
        // limit empty lines
        max: 2,
        maxEOF: 0,
      },
    ],
    "space-before-function-paren": [ "error", "always" ], // space before "()" in function
    "space-before-blocks": [ "error", "always" ], // space before {}
    "space-in-parens": [ "error", "never" ],
    "array-bracket-spacing": [ "error", "always" ],
    "comma-dangle": [ "error", "always-multiline" ],
    "max-params": [ "error", 3 ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: [ "const", "let", "var" ],
        next: "*",
      },
      {
        blankLine: "any",
        prev: [ "const", "let", "var" ],
        next: [ "const", "let", "var" ],
      },
      {
        blankLine: "always",
        prev: "import",
        next: "export",
      },
      {
        blankLine: "always",
        prev: "*",
        next: [ "throw", "return", "function", "debugger" ],
      },
      {
        blankLine: "always",
        prev: "debugger",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "multiline-block-like",
      },
    ],
    "no-async-promise-executor": 0,
    "no-undef": "warn",
  },
};
