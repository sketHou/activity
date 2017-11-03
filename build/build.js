var chalk = require('chalk');
var path = require('path');
var webpack = require('webpack');
var rm = require('rimraf');
var rootDir = path.resolve(__dirname, '../'); 
var srcDir = path.resolve(__dirname, '../src'); 
var distDir = path.resolve(rootDir, 'dist');

var webpackConf = require('./webpack.prod.js');

var compileDirName = process.argv[3];
var compilePath = path.resolve(srcDir, compileDirName);
var entryJs = path.resolve(compilePath, 'js/m_index.js');
var targetDir = path.resolve(distDir, compileDirName);

rm(targetDir, err => {
    webpack(webpackConf, function(err, stats) {
        if (err) throw err;
    });
});

