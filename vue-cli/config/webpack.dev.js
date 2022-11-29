const path = require('path'); //nodejs
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const isProduction = process.env.NODE_ENV === 'production';
const getStyleLoaders = (pre) =>{
    return [
        'vue-style-loader',
        "css-loader",
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"]
                }
            }
        },
        pre
    ].filter(Boolean)
}
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
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader")
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
                test: /\.js?$/,
                include: path.join(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            catch: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.catch/.eslintcatche')
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__:true, 
            __VUE_OPTIONS_DEVTOOLS__:false
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../public/index.html'), //生成的新的html文件所依赖的模板
        //     filename: 'index.html' //生成的新的html文件的名字
        // }),
        new VueLoaderPlugin()
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
        extensions: [".vue", ".js", ".json"]
    }
}
//npm install -D vue-loader vue-template-compiler
/*
>npm i webpack-dev-server
webpack-cli npm i vue-template-compiler
install html-webpack-plugin@5.0.0-alpha.9
npm install eslint-plugin-vue
*/