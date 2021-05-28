# @loong-js/loong-loader

This is lsx loader.

## 📦 Installation

```bash
npm install --save-dev @loong-js/loong-loader
```

## 🔨 Usage

```javascript
const otherRules = [
  ...
];
const webpackOptions = {
  ...
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          // Parsing JSX requires putting Loong loader at the end
          '@loong-js/loong-loader',
          ...otherRules
        ],
      },
      {
        test: /\.lsx/,
        exclude: /node_modules/,
        use: [
          ...otherRules,
          // To parse LSX, you need to put Loong loader in the first place to convert it to the correct LSX format
          '@loong-js/loong-loader',
        ],
      },
    ],
  },
  ...
}
```

## 🐛 Issues

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/loong-js/loong-loader/issues).

## 🏁 Changelog

Changes are tracked in the [CHANGELOG.md](https://github.com/loong-js/loong-loader/blob/master/CHANGELOG.md).

## 📄 License

`loong-loader` is available under the [MIT](https://github.com/loong-js/loong-loader/blob/master/LICENSE) License.
