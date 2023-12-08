module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
    },
    globals: {
        ajax: true,
        axios: true,
        Tether: true,
        Promise: true,
        d3: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
    ],
    rules: {
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        semi: ["error", "always"],
        "comma-dangle": [
            "warn",
            {
                arrays: "ignore",
                objects: "ignore",
                imports: "ignore",
                exports: "ignore",
                functions: "never",
            },
        ],
        "no-control-regex": "off",
        "comma-style": ["error", "last"],
        "computed-property-spacing": ["error", "never"],
        "no-console": "off", //["error", { "allow": ["warn", "error"] }],
        "no-debugger": "off",
        "no-alert": "error",
        "no-dupe-args": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "vue/no-lone-template": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/max-attributes-per-line": "off",
        'vue/multi-word-component-names': 'off'
    },
};
