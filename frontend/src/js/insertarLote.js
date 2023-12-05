import { obtenerDatos } from '../js/http/http-consultarUsuarios.js';
import AnadirLote from './clases/Lote.js';
import { enviarDatos } from './http/http-insertarRol.js';

var btnRegistrar = document.getElementById('btnAnadirLote');

document.addEventListener('DOMContentLoaded', function () {
    var selUsuario = document.getElementById('selUsuario');

    if (!selUsuario) {
        console.error('No se encontró el elemento con ID "selUsuario".');
        return;
    }

    obtenerDatos()
        .then(response => {
            const usuarios = response.usuarios;

            if (Array.isArray(usuarios)) {
                // Limpiar las opciones actuales del select
                selUsuario.innerHTML = '';

                // Agregar una opción por cada usuario
                usuarios.forEach(usuario => {
                    var optionUsuario = document.createElement('option');
                    optionUsuario.value = usuario.id;
                    optionUsuario.text = usuario.name;
                    selUsuario.add(optionUsuario);
                });
            } else {
                console.error('La respuesta de la API no es un array:', usuarios);
            }
        })
        .catch(error => {
            console.error('Error al cargar datos en el select:', error);
        });
});

btnRegistrar.addEventListener('click', function(event){
    event.preventDefault();
    console.log(sessionStorage.getItem("Latitud"))
    var anadirLote = new AnadirLote(selUsuario.value, sessionStorage.getItem("Latitud"), sessionStorage.getItem("Longitud"), 'Entregado');
    enviarDatos(anadirLote, 'http://127.0.0.1:8000/api/lotes/agregar/lote');
    window.location.href="indexColaborador.html";

});
