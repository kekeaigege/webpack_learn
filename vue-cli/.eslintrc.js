module.exports = {
    root:true,
    env:{
        node:true,
    },
    extends:["plugin:vue/vue3-essential","eslint:recommended"],
    parserOptions:{
        parser"@babel/eslint-parser"
    },
    rules: {
        "no-console": "off",
        "no-debugger": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-var-requires": 0
      }
}