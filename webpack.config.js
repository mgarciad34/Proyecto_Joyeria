const path = require('path');

module.exports = {
  entry: './src/js/registro.js',
  output: {
    filename: '[registro].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
