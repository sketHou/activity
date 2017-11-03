var path = require('path');
var webpack = require('webpack');
var rootDir = path.resolve(__dirname, '../'); 
var nodeModules = path.resolve(rootDir, '/node_modules/'); 
var htmlWebpackPlugin = require('html-webpack-plugin');
var SassPlugin = require('sass-webpack-plugin');
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

var compileDirName = process.argv[3];
var rootDir = path.resolve(__dirname, '../'); 
var srcDir = path.resolve(__dirname, '../src'); 
var distDir = path.resolve(rootDir, 'dist');
var compilePath = path.resolve(srcDir, compileDirName);
var entryJs = path.resolve(compilePath, 'js/m_index.js');

var extractCss = new ExtractTextWebpackPlugin('./css/[name].css');


module.exports = {
    entry: {
        app: entryJs,
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(distDir, compileDirName, 'js'),
        filename: 'bundle.js?v=[chunkhash]'        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: nodeModules,
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
                loader: extractCss.extract(['style-loader', 'postcss-loader', 'css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js?v=[chunkhash]',
            
        }),
        extractCss,
        // new SassPlugin('../style/css.scss', {
        //     // sourceMap: true,
        //     sass: { outputStyle: 'compressed' },
        //     // autoprefixer: true
        // }),
        new htmlWebpackPlugin({
            filename: '../m_index.html',
            template: path.resolve(compilePath, 'm_index.html'),
            removeComments: true,
            collapseWhitespace: true
        })
    ]
};