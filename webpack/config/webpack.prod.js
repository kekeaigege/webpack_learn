const path = require('path'); //nodejs

const ESLintPlugin = require('eslint-webpack-plugin'); //语法检查
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html资源合并
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css优化处理
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩成一行
const os = require('os'); //获取cpu核数
const threads = os.cpus().length;
const TerserWebpackPlugin = require('terser-webpack-plugin')
//获取处理样式loader
function getStyleLoader(pre) {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader', //执行顺序从右到左
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                            {
                                // 其他选项
                            },
                        ],
                    ],
                },
            },
        },
        pre
    ].filter(Boolean) //有空值就过滤

}
module.exports = {
    //入口
    entry: "./src/main.js", //相对路径
    //输出
    output: {
        //输出路径
        //代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), //绝对路径
        //输出名称  js输出更改路径
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        //图片字体通过type:asset处理资源内容进行打包
        assetModuleFilename:"static/media/[hash:10][ext][query]"
        clean: true
    },
    plugins: [new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            threads //开启进程数量
        }), new HtmlWebpackPlugin({
            //模板 以public/index.html 文件创建新的html文件
            //新的html文件特点 1.结构和原来一致2.自动引入打包输出的资源
            template: path.resolve(__dirname, '../public/index.html')
        }), new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].chunk.css"
        }), new CssMinimizerPlugin(),
        new TerserWebpackPlugin({
            parallel: threads
        })
    ],
    // devServer: {
    //     host: 'localhost', //启动服务器域名
    //     port: "3000", //启动服务器端口号
    //     open: true //是自动打开浏览器
    // },
    module: {
        rules: [{
            oneOf: [{
                    test: /\.css$/,
                    use: getStyleLoader()
                },
                {
                    test: /\.less$/,
                    use: getStyleLoader('less-loader')
                },
                {
                    test: /\.sass$/,
                    use: getStyleLoader('sass-loader')
                },
                {
                    test: /\.(png|jpe?g|gif|webp|svg)$/,
                    type: 'asset',

                    parser: {

                        dataUrlCondition: {

                            maxSize: 10 * 1024 // 10kb减少请求数量,webpack直接处理

                        }

                    },
                    // generator: {
                    //     filename: "static/images/[hash:10][ext][query]" //hash:webpack根据图片内容默认生成的hash值唯一的:10 只取10位
                    //     //ext 文件扩展名
                    // }
                },
                {
                    test: /\.(ttf|woff2?|map3|mp4|avi)$/,
                    type: 'asset/resource',
                    // generator: {
                    //     filename: "static/media/[hash:10][ext][query]" //hash:webpack根据图片内容默认生成的hash值唯一的:10 只取10位
                    //     //ext 文件扩展名
                    // }
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/, //排除node_modules中文件
                    use: [{
                            loader: 'thread-loader', //开启多进程
                            options: { //进程数量
                                workers: threads
                            }
                        },
                        {
                            loader: "babel-loader", //智能预设
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins:["@babel/plugin-transform-runtime"]//减少代码体积
                            }
                        }
                    ]
                }


            ]
        }],

    },
    optimization:{//代码分割操作
        splitChunks:{
            chunks:"all"//其他都用默认值即可
        }
    },
    mode: "production",
    devtool: "source-map"
}