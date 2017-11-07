var path = require('path');
var rootPath = path.resolve(__dirname, '../'); 
var nodeModulesPath = path.resolve(rootPath, '/node_modules/'); 
var compileDirName = process.argv[3];
var srcPath = path.resolve(__dirname, '../src'); 
var distPath = path.resolve(rootPath, 'dist');
var compilePath = path.resolve(srcPath, compileDirName);
var entry = path.resolve(compilePath, 'js/m_index.js');
var targetpath = path.resolve(distPath, compileDirName);

module.exports = {
    rootPath: rootPath,
    nodeModulesPath: nodeModulesPath,
    srcPath: srcPath,
    distPath: distPath,
    targetpath: targetpath,
    compilePath: compilePath,
    compileDirName: compileDirName,
    entry: entry
}
