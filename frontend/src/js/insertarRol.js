//Manuel
import { obtenerDatos } from '../js/http/http-consultarUsuarios.js';
import RolesAsignados from './clases/rolesAsignados.js';
import { enviarDatos } from './http/http-insertarRol.js';

var btnRegistrarRol = document.getElementById('btnInsertarRol');
var mensajeBoton = document.getElementById('mensajeBoton');

document.addEventListener('DOMContentLoaded', function () {
    var selUsuario = document.getElementById('selUsuario');
    var selRol = document.getElementById('selRol');

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
                    optionUsuario.text = usuario.name; // Ajusta según la estructura de tus datos
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

btnRegistrarRol.addEventListener('click', function(event){
    event.preventDefault();
    var rolAsignado = new RolesAsignados(selUsuario.value, selRol.value)
    enviarDatos(rolAsignado, 'http://127.0.0.1:8000/api/administrador/agregar/rol/usuario');
    window.location.href="indexAdministrador.html";

});
