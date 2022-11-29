const path = require('path'); //nodejs
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //入口
    entry: "./src/main.js", //相对路径
    //输出
    output: {
        //输出路径
        //代表当前文件的文件夹目录
        path: undefined, //绝对路径  回退路径
        //输出名称  js输出更改路径
        filename: 'static/js/main.js',
        // clean: true
    },
    plugins: [new ESLintPlugin({
        context: path.resolve(__dirname, '../src'),
        exclude: "node_modules", //默认值
        catch: true,
        cacheLocation: path.resolve(__dirname, '../node_modules/.catch/eslintcatche')
    }), new HtmlWebpackPlugin(),
     new HtmlWebpackPlugin({
        //模板 以public/index.html 文件创建新的html文件
        //新的html文件特点 1.结构和原来一致2.自动引入打包输出的资源
        template: path.resolve(__dirname, '../public/index.html')
    })],
    devServer: {
        host: 'localhost', //启动服务器域名
        port: "3000", //启动服务器端口号
        open: true, //是自动打开浏览器
        hot: false //关闭HML
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader' //执行顺序从右到左

                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',

                parser: {

                    dataUrlCondition: {

                        maxSize: 10 * 1024 // 10kb减少请求数量,webpack直接处理

                    }

                },
                generator: {
                    filename: "static/images/[hash:10][ext][query]" //hash:webpack根据图片内容默认生成的hash值唯一的:10 只取10位
                    //ext 文件扩展名
                }
            },
            {
                test: /\.(ttf|woff2?|map3|mp4|avi)$/,
                type: 'asset/resource',
                generator: {
                    filename: "static/media/[hash:10][ext][query]" //hash:webpack根据图片内容默认生成的hash值唯一的:10 只取10位
                    //ext 文件扩展名
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/, //排除node_modules中文件
                loader: "babel-loader", //智能预设
                options: {
                    presets: ['@babel/preset-env'],
                    catchDirectory: true, //开启babel缓存
                    catchCompression: false //关闭缓存文件
                }
            }

        ],

    },
    mode: "development",
    devtool: "cheap-module-source-map"
}

/*
npm i babel-loader @babel/core babel-preset-react-app -D
npm i eslint-webpack-plugin html-webpack-plugin style-loader postcss-loader css-loader less-loader sass-loader stylus-loader
npm i eslint-config-react-app -D
npm i webpack-dev-server webpack-cli -D
npm i react react-dom
*/