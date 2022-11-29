const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/main.js",
    output: {
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name].js"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader:"./loaders/test-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            //模板 以public/index.html 文件创建新的html文件
            //新的html文件特点 1.结构和原来一致2.自动引入打包输出的资源
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    mode: 'development'
}