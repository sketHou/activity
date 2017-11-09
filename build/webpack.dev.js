var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var SassPlugin = require('sass-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getEntryJs = require('./util').getEntryJs;
var getEntryHtml = require('./util').getEntryHtml;
const compileDirName = process.argv[3];

var webpackConfig = {
    entry: getEntryJs(),
    output: {
        path: config.targetpath,
        filename: 'js/[name].bundle.js'
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
                test: /\.scss$/,
                exclude: /node_modules/,
                // loader: extractCss.extract(['style-loader', 'postcss-loader', 'css-loader', 'sass-loader'])
                loader: 'style-loader!css-loader!autoprefixer-loader!sprite-loader!sass-loader',
                // publicPath: '../'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: './images/'
                        }
                    }
                ]
            },
            // {
            //     test: /\.(html)$/,
            //     use: [
            //         {
            //             loader: 'html-loader',
            //             options: {
            //                 minimize: true,
            //                 removeComments: true
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'js/vendor.bundle.js?v=[chunkhash]',
        // }),
        // new ExtractTextPlugin('css/[name].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
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
