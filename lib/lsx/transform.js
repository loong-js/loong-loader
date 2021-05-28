const babel = require("@babel/core");

module.exports = function transform(code) {
  return babel.transformAsync(code, {
    plugins: [
      '@babel/plugin-syntax-jsx',
      '@loong-js/babel-plugin-transform-loong',
    ],
  });
};