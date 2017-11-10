var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var SassPlugin = require('sass-webpack-plugin');
var getEntryJs = require('./util').getEntryJs;
var getEntryHtml = require('./util').getEntryHtml;

var webpackConfig = {
    entry: getEntryJs(),
    output: {
        path: config.targetpath,
        filename: 'js/[name].bundle.js?v=[chunkhash]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: config.nodeModulesPath,
                use: {
                    loader: 'babel-loader',
                    options: {
                        compact: true,
                        minified: true
                    }
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader' // Run both loaders
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]?v=[hash]',
                            outputPath: './images/'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            removeComments: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: []
};

var pages = getEntryHtml();
pages.forEach(function (data) {
    var plugin = new htmlWebpackPlugin({
        filename: data.name + '.html',
        template: path.resolve(config.compilePath, data.fileName),
        removeComments: true,
        collapseWhitespace: true,
        chunks: [data.name]
    });
    webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;
