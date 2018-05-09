const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
console.log(__dirname)
module.exports = {
    entry: [
        './lib/app.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|woff|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "lib"),
        publicPath: "lib/",
        filename: 'scripts/bundle.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./lib/template.html",
            filename: "../index.html"
        })
    ],
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 3000
    }
};