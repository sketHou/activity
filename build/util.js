const fs = require('fs');
const compilePath = require('./config.js').compilePath;
var path = require('path');


var getHtmls = function(compilePath, htmlList) {
    htmlList = htmlList || [];
    fs.readdirSync(compilePath).forEach( file => {
        var filePath = path.resolve(compilePath, file);
        var stat = fs.statSync(filePath);
        if ( stat && stat.isDirectory() ) {
            htmlList.concat(getHtmls(filePath, htmlList));
        } else if ( isHtml(file) ){
            htmlList.push(filePath);
        }
    });
    return htmlList;
};



function isHtml(file) {
    var ext = path.extname(file);
    if ( ext == '.html' ) {
        return true;
    } else {
        return false;
    }
}

var getEntryJs = function () {
    var htmlList = getHtmls(compilePath);
    var result = {};
    htmlList.forEach(function (data) {
        var name = path.basename(data, '.html');
        result[name] = [
            path.resolve(compilePath, 'js/' + name + '.js')
        ];
    });
    return result;
}

var getEntryHtml = function () {
    var list = getHtmls(compilePath);
    var result = [];
    list.forEach(function (data) {
        var name = path.basename(data, '.html');
        result.push({
            path: './' + name + '.html',
            fileName: name + '.html',
            name: name
        });
    });
    return result;
}


// console.log(getEntry());


module.exports = {
    getEntryJs: getEntryJs,
    getEntryHtml: getEntryHtml
}