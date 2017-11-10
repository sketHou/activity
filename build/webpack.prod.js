var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader', 'sprite-loader', 'sass-loader'],
                    publicPath: '../'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css?v=[chunkhash]'),
    ]
};

module.exports = webpackConfig;
