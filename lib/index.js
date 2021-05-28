const path = require('path');
const processLSX = require('./lsx/process-lsx');
const processScript = require('./script/process-script');

/**
 * 1. js 文件引入 lsx，并且做处理
 * 2. lsx 文件解析，优先用 loong-loader 解析，后面用解析 js 的 loader,
 */

module.exports = function (source) {
  const callback = this.async();

  if (path.extname(this.resourcePath) === '.lsx') {
    processLSX({
      source,
      callback,
      loaderContext: this,
    });
    return;
  }

  processScript({
    source,
    callback,
    loaderContext: this,
  });
}