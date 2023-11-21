const path= require('path')
module.exports = {
    entry: {
        appClasificador: './frontend/src/js/appClasificador.js',
        appLote: './frontend/src/js/appLote.js',
        appDesignjoya: './frontend/src/js/appDesignJoya.js',
        appListadoJoyas: './frontend/src/js/appListadoJoyas.js',
        appListadoJoyasUsuario: './frontend/src/js/appListadoJoyasUsuario.js',
        appRecetaJoya: './frontend/src/js/appRecetaJoya.js',
        appHistorialJoyas: './frontend/src/js/appHistorialJoyas.js',
        httpDesignJoya: './frontend/src/js/http/http-designJoya.js',
        httpClasificador: './frontend/src/js/http/http-Clasificador.js',
        httpLote: './frontend/src/js/http/http-lote.js',
        httpListadoJoyas: './frontend/src/js/http/http-listadoJoyas.js',
        httpRecetajoya: './frontend/src/js/http/http-receta-joya.js',
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
   
   


};