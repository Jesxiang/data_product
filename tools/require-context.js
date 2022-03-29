var dir = require('node-dir');
var path = require('path');

/**
 *
 * @param {*} directory 路径 - path.join(__dirname, directory)    string
 * @param {*} recursive 是否递归    boolean
 * @param {*} regExp 正则       regExp
 * @param {*} exclude 排除的文件夹   array
 */
module.exports = function(directory, recursive = false, regExp = /\.(json|js)$/, exclude = []) {
  var keys = dir
    .files(directory, {
      sync: true,
      recursive: recursive
    })
    .filter(function(file) {
      return file.match(regExp) && exclude.map(o => `/${o}`).every(m => !file.includes(m));
    })
    .map(function(file) {
      return path.join('.', file.slice(directory.length + 1))
    })

  return keys
}