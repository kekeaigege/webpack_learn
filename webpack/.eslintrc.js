module.exports = {
    extends: ["eslint:recommended"],
    env: {
        node: true, //启用node中全局变量
        browser: true //启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6, //表示使用es2016
        sourceType: 'module' //指定模块类型sourceType为module
    },
    rules: {
        "no-var": 2 //不能使用var被定义变量
    },
    plugins: ["import"]//解决动态导入语法
}