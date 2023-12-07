//Manuel
import AnadirLote from './clases/Lote.js';
import { enviarDatos } from './http/http-insertarRol.js';

var btnRegistrar = document.getElementById('btnAnadirLote');



btnRegistrar.addEventListener('click', function(event){
    event.preventDefault();
    console.log(sessionStorage.getItem("Latitud"))
    var anadirLote = new AnadirLote(sessionStorage.getItem("id-usuario"), sessionStorage.getItem("Latitud"), sessionStorage.getItem("Longitud"), 'Entregado');
    enviarDatos(anadirLote, 'http://127.0.0.1:8000/api/lotes/agregar/lote');
    window.location.href="indexColaborador.html";

});
