const path = require('path'); //nodejs
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
const getStyleLoaders = (pre) =>{
    return [
        isProduction? MiniCssExtractPlugin.loader :"style-loader",
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
        path: isProduction?path.resolve(__dirname, "../dist"):undefined,
        filename:isProduction? "static/js/[name].[contenthash:10].js":"static/js/[name].js",
        chunkFilename: isProduction? 'static/js/[name].[contenthash:10].chunk.js':'static/js/[name].chunk.js',
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use:getStyleLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders('sass-loader')
            },
            {
                test: /\.styl$/,
                use:  use: getStyleLoaders('stylus-loader')
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
        }),  isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),  new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ["gifsicle", {
                        interlaced: true
                    }],
                    ["jpegtran", {
                        progressive: true
                    }],
                    ["optipng", {
                        optimizationLevel: 5
                    }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    [
                        "svgo",
                        {
                            plugins: extendDefaultPlugins([{
                                    name: "removeViewBox",
                                    active: false,
                                },
                                {
                                    name: "addAttributesToSVGElement",
                                    params: {
                                        attributes: [{
                                            xmlns: "http://www.w3.org/2000/svg"
                                        }],
                                    },
                                },
                            ]),
                        },
                    ],
                ],
            },
        }), isProduction && new CopyPlugin({
            patterns: [
              { from: path.relative(__dirname,"../public"), to:  path.relative(__dirname,"../dist"), exports
              globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["**/index.html"],
              },
            },
            ],
          }),
    ],
    mode: isProduction? 'production':'development',
    devtool: "source-map",
    optimization: {
        minimize:isProduction,
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        },
        minimizer: [
            new CssMinimizerPlugin(), new TerserWebpackPlugin()
        ]
    },
    //自动补全
    resolve: {
        extensions: [".jsx", ".js", ".json"]
    }
}
//https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/#root
//npm install copy-webpack-plugin --save-dev
/*

 "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },

  server
*/