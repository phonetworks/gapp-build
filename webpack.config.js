const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './lib/app.js',
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
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
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
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: true,
                    compress: {
                        warnings: false,
                        pure_getters: true,
                        unsafe: true,
                        unsafe_comps: true,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./lib/template.html",
            filename: "../index.html"
        }),
        //new BundleAnalyzerPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 3000
    }
};
