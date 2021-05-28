const transform = require('./transform');

module.exports = async function processLSX({
  source,
  callback,
}) {
  try {
    const result = await transform(source);
    const code = `
import { Condition, Foreach } from '@loong-js/components';
export default ${result.code};
`;
    callback(null, code);
  } catch (error) {
    callback(error);
  }
}