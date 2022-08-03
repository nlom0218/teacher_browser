module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  extends: ["react-app", "plugin:prettier/recommended"],
};
