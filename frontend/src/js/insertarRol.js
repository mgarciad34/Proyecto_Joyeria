//Manuel
import { obtenerDatos } from '../js/http/http-consultarUsuarios.js';
import RolesAsignados from './clases/rolesAsignados.js';
import { enviarDatos } from './http/http-insertarRol.js';

var btnRegistrarRol = document.getElementById('btnInsertarRol');
var mensajeBoton = document.getElementById('mensajeBoton');

document.addEventListener('DOMContentLoaded', function () {
    let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav2').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('administrador'))
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
                selUsuario.innerHTML = '';

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

btnRegistrarRol.addEventListener('click', function (event) {
    event.preventDefault();
    if (sessionStorage.getItem("ultimo-acceso") === "administrador") {
        var rolAsignado = new RolesAsignados(selUsuario.value, selRol.value)
        enviarDatos(rolAsignado, 'http://127.0.0.1:8000/api/administrador/agregar/rol/usuario')
        .then(response => {
            if(response === 201){
                mensajeBoton.value = "";
                window.location.href = "indexAdministrador.html";
            }else if(response === 400){
                mensajeBoton.innerHTML = "El usuario ya tiene ese permiso";
                mensajeBoton.style.color = "red";
            }
        })
        
        
    }
});