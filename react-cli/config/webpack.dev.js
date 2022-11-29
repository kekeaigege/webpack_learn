const path = require('path'); //nodejs
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: "static/media/[hash:10][ext][query]"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                     "css-loader", 
                     {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", 
                    "css-loader",
                     {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", 
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
                    }
                }, 
                "sass-loader"]
            },
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
                    }
                }, 
                "stylus-loader"]

            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource",
            },
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            catch: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.catch/eslintcatche')
        }), new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ],
    mode: 'development',
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        }
    },
    devServer: {
        host: 'localhost', //启动服务器域名
        port: "3000", //启动服务器端口号
        open: true, //是自动打开浏览器
        hot: true //关闭HML
    },
    //自动补全
    resolve: {
        extensions: [".jsx", ".js", ".json"]
    }
}