const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackBaseConfig = require('./webpack.base');
const webpackDevConfig = require('./webpack.dev');
const merge = require('webpack-merge');
const compileDirName = process.argv[3];

var webpackConfig = merge(webpackBaseConfig, webpackDevConfig);

Object.keys(webpackConfig.entry).forEach(element => {
	var entry = webpackConfig.entry[element];
	webpackConfig.entry[element] = [
		entry,
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/dev-server'
	];
});

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	stats: {
		colors: true
	},
	hot: true,
	inline: true,
	publicPath: '/' + compileDirName + '/'
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Starting server on http://127.0.0.1:8080/' + compileDirName + '/');
});