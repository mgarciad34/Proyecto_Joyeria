const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    registro: './frontend/src/js/registro.js',
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './frontend/src/views/registro.html',
      filename: 'views/registro.html',
    }),
  ]
};
