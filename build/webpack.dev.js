var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var SassPlugin = require('sass-webpack-plugin');


var webpackConfig = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sprite-loader!sass-loader',
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
};

module.exports = webpackConfig;
