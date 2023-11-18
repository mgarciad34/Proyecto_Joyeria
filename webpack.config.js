const path= require('path')
module.exports = {
    entry: {
        appClasificador: './frontend/src/js/appClasificador.js',
        appLote: './frontend/src/js/appLote.js',
        appDesignjoya: './frontend/src/js/appDesignJoya.js',
        httpDesignJoya: './frontend/src/js/http/http-designJoya.js',
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
   
   


};