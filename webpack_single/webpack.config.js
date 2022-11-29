const PreloadWebpackPlugin = require('preload-webpack-plugin');
const path = require('path');
module.exports = {
    entry: "./src/main.js",
    output: {
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new PreloadWebpackPlugin({
          rel: 'preload',
          include: 'asyncChunks'
        }),   new HtmlWebpackPlugin({

            title: 'Output Management',
     
            title: 'Progressive Web Application',
           }),
     
          new WorkboxPlugin.GenerateSW({
     
            // 这些选项帮助快速启用 ServiceWorkers
     
            // 不允许遗留任何“旧的” ServiceWorkers
     
            clientsClaim: true,
     
            skipWaiting: true,
     
          }),
      ],
    mode:"production",
    optimization:{
        //代码分割配置
        splitChunks:{
            chunks:"all"
        }
    }
}