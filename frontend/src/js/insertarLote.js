//Manuel
import AnadirLote from './clases/Lote.js';
import { enviarDatos } from './http/http-insertarRol.js';

var btnRegistrar = document.getElementById('btnAnadirLote');



btnRegistrar.addEventListener('click', function(event){
    event.preventDefault();
    if(sessionStorage.getItem("acceso") == "Colaborador"){
        var anadirLote = new AnadirLote(sessionStorage.getItem("id-usuario"), sessionStorage.getItem("Latitud"), sessionStorage.getItem("Longitud"), 'Entregado');
        enviarDatos(anadirLote, 'http://127.0.0.1:8000/api/lotes/agregar/lote');
        window.location.href="indexColaborador.html";
    }else{
        window.location.href = 'redirect.html';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var token = sessionStorage.getItem("token")
    if (token == null) {
        window.location.href = 'redirect.html';
    }
});