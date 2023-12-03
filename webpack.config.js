
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    registro: './frontend/src/js/registro.js',
    login: './frontend/src/js/login.js',
    insertarUsuarios: './frontend/src/js/insertarUsuarios.js',
    consultarUsuarios: './frontend/src/js/consultarUsuarios.js',
    insertarComponentes: './frontend/src/js/insertarComponentes.js',
    insertarRol: './frontend/src/js/insertarRol.js',
    eliminarRol: './frontend/src/js/eliminarRol.js',
    consultarComponentes: './frontend/src/js/consultarComponentes.js',
    appClasificador: './frontend/src/js/appClasificador.js',
    appLote: './frontend/src/js/appLote.js',
    appDesignjoya: './frontend/src/js/appDesignJoya.js',
    appListadoJoyas: './frontend/src/js/appListadoJoyas.js',
    appListadoJoyasUsuario: './frontend/src/js/appListadoJoyasUsuario.js',
    appRecetaJoya: './frontend/src/js/appRecetaJoya.js',
    appHistorialJoyas: './frontend/src/js/appHistorialJoyas.js',
    appModificarJoya: './frontend/src/js/appModificarJoya.js',
    appFabricarJoyas: './frontend/src/js/appFabricarJoyas.js',
    appLotesClasificados:'./frontend/src/js/appLotesClasificados.js',
    appDespieceLote:'./frontend/src/js/appDespieceLote.js',
    appComponentesClasificados:'./frontend/src/js/appComponentesClasificados.js',
  },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
        static: path.resolve(__dirname, './'), 
        port: 8090, 
        open: {
          target: 'frontend/src/index.html',
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          
        },
        
      },
   
};
