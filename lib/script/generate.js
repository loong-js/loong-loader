const babel = require('@babel/core');

module.exports = function generate({
  source,
  name,
  importName,
}) {
  const importMap = {
    '@loong-js/core': {
      imports: ['createComponent'],
      existed: false,
    },
  };
  function plugin({
    types
  }) {
    return {
      visitor: {
        // ImportDeclaration 判断 @loong-js/core @loong-js/components
        // 如果没有，那就添加
        ImportDeclaration: {
          enter(path) {
            const sourcePackage = path.node.source.value;
            if (!importMap[sourcePackage]) {
              return;
            }
            importMap[sourcePackage].existed = true;
            if (sourcePackage === '@loong-js/core') {
              const needImportNames = importMap[sourcePackage].imports.filter(importName => !path.node.specifiers.includes(importName));
              const importNameNodes = needImportNames.map(importName => {
                const importNameNode = types.identifier(importName);
                return types.importSpecifier(importNameNode, importNameNode);
              });
              Array.prototype.push.apply(path.node.specifiers, importNameNodes);
            }
          }
        },
        Program: {
          exit(path) {
            const importNode = types.importDeclaration(
              [
                types.importDefaultSpecifier(
                  types.identifier(importName),
                ),
              ],
              types.stringLiteral(`./${name}.lsx`),
            );
            path.node.body.unshift(importNode);
            if (!importMap['@loong-js/core'].existed) {
              const importNameNodes = importMap['@loong-js/core'].imports.map(importName => {
                const importNameNode = types.identifier(importName);
                return types.importSpecifier(importNameNode, importNameNode);
              });
              const importNode = types.importDeclaration(
                importNameNodes,
                types.stringLiteral('@loong-js/core'),
              );
              path.node.body.unshift(importNode);
            }
          }
        },
        ExportDefaultDeclaration(path) {
          if (path.node.__executed__) {
            return;
          }
          if (path.node.declaration.type === 'ClassDeclaration') {
            path.node.declaration.type = 'ClassExpression';
          }
          const exportDefaultNode = types.exportDefaultDeclaration(
            types.callExpression(
              types.identifier('createComponent'),
              [
                types.identifier(importName),
                path.node.declaration
              ]
            ),
          );
          exportDefaultNode.__executed__ = true;
          path.replaceWithMultiple([
            exportDefaultNode,
          ]);
        },
      },
    };
  }

  return babel.transformAsync(source, {
    plugins: [plugin],
  });
}