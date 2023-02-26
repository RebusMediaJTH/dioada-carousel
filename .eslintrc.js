module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    globals: {
        dioada: "readonly"
    },
    extends: ["eslint:recommended", "plugin:import/recommended"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: ["import"],
    overrides: [],
    rules: {},
    settings: {}
};
