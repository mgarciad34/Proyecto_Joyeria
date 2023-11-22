const path = require('path');

module.exports = {
  entry: {
    registro: './frontend/src/js/registro.js',
  
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
