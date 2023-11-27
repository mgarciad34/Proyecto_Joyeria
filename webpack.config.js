
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        registro: './frontend/src/js/registro.js',
        login: './frontend/src/js/login.js',
        appClasificador: './frontend/src/js/appClasificador.js',
        appLote: './frontend/src/js/appLote.js',
        appDesignjoya: './frontend/src/js/appDesignJoya.js',
        appListadoJoyas: './frontend/src/js/appListadoJoyas.js',
        appListadoJoyasUsuario: './frontend/src/js/appListadoJoyasUsuario.js',
        appRecetaJoya: './frontend/src/js/appRecetaJoya.js',
        appHistorialJoyas: './frontend/src/js/appHistorialJoyas.js',
        appModificarJoya: './frontend/src/js/appModificarJoya.js',
        appFabricarJoyas: './frontend/src/js/appFabricarJoyas.js',
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
        static: path.resolve(__dirname, './'), 
        port: 8080, 
        open: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          
        },
      },
   


};

  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './frontend/src/views/registro.html',
      filename: 'views/registro.html',
    }),
    new HtmlWebpackPlugin({
      template: './frontend/src/views/inicio.html',
      filename: 'views/inicio.html',
    }),
  ]
};

