const path = require('path');
const fs = require('fs');
const generate = require('./generate');

function exists(path) {
  return new Promise(resolve => {
    fs.stat(path, error => {
      if (error) {
        return resolve(false);
      }
      resolve(true);
    });
  });
}

module.exports = async function processScript({
  source,
  callback,
  loaderContext,
}) {
  const name = path.basename(loaderContext.resourcePath).split('.')[0];
  const resourceDirname = path.dirname(loaderContext.resourcePath);
  const lsxPath = path.join(resourceDirname, `${name}.lsx`);
  const importName = '__lsx__';

  if (!await exists(lsxPath)) {
    callback(null, source);
    return;
  }

  try {
    const generated = await generate({
      source,
      name,
      importName,
    });
    console.log(generated.code);
    callback(null, generated.code);
  } catch (error) {
    callback(error);
  }
}