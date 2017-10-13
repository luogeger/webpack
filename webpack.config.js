const webpack = require('webpack');// 这是内置插件，new webpack.BannerPlugin('')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },


    devtool: 'eval-source-map',

    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },// .js

            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options:{
                            modules: true
                        }
                    },{
                        loader: "postcss-loader"
                    }
                ]
            },// .css
        ]
    },

    plugins: [
        new webpack.BannerPlugin('by luogeger + html-plugin'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ],
}


