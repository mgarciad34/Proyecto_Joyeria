//Manuel
//Importamos las clases que vamos a usar
import UsersAdministrador from '../js/clases/UsersAdministrador.js';
import { validarNombre, validarCorreo, validarContrasena, confirmarContrasena } from './validaciones.js';
import { comprobarColor } from './http/http-registro.js';
import { enviarDatos } from './http/http-insertarUsuarios.js';

//Llamamos a todas las variables que vamos a usar

//Variables de tipo input
var nombre = document.getElementById('txtnombre');
var correo = document.getElementById('txtcorreo');
var contrasena = document.getElementById('txtcontrasena');
var confirmaContrasena = document.getElementById('txtconfirmarContrasena');

//Varibles que notifican mensajes
var msgNombre = document.getElementById('mensajeNombre');
var msgCorreo = document.getElementById('mensajeCorreo');
var msgcontrasena = document.getElementById('mensajeContrasena');
var msgconfirmarContrasena = document.getElementById('mensajeConfirmarContrasena');

//Botones
var btnregistro = document.getElementById('btnregistrar');

//Funcionalidades

function comprobarContrasena(contrasena) {
    var contrasenaTam = contrasena.length;
    var validacion = true;

    if (contrasenaTam < 6 || contrasenaTam > 12) {
        validacion = false;
        msgcontrasena.style.color = "red";
        msgcontrasena.innerHTML = "El tamaño debe de ser entre 6 y 12<br>";
    }
    if (validarContrasena(contrasena) === false) {
        validacion = false;
        msgcontrasena.style.color = "red";
        msgcontrasena.innerHTML += "El formato de contraseña no es válido";
    }
    if (validacion === true) {
        msgcontrasena.style.color = "green";
        msgcontrasena.innerHTML = "Contraseña válida";
    }
    return validacion;
}

// Eventos

nombre.addEventListener('input', function () {
    if (validarNombre(nombre.value) === false) {
        msgNombre.style.color = "red";
        msgNombre.innerHTML = "Nombre Incorrecto";
    } else {
        msgNombre.style.color = "green";
        msgNombre.innerHTML = "Nombre Correcto";
    }
});

correo.addEventListener('input', function () {
    if (validarCorreo(correo.value) === false) {
        msgCorreo.style.color = "red";
        msgCorreo.innerHTML = "Correo Incorrecto";
    } else {
        msgCorreo.style.color = "green";
        msgCorreo.innerHTML = "Correo Correcto";
    }
});

contrasena.addEventListener('input', function () {
    comprobarContrasena(contrasena.value);
});

confirmaContrasena.addEventListener('input', function () {
    var result = confirmarContrasena(contrasena.value, confirmaContrasena.value);


    if (result === true) {
        msgconfirmarContrasena.style.color = "green";
        msgconfirmarContrasena.innerHTML = "Las contraseñas coinciden";
    } else {
        msgconfirmarContrasena.style.color = "red";
        msgconfirmarContrasena.innerHTML = "Las contraseñas no coinciden";
    }
});


//Funcionalidad boton

btnregistro.addEventListener('click', function (event) {
    event.preventDefault();
    var nuevoUsuario = new UsersAdministrador(nombre.value, correo.value, contrasena.value, 4);

    const url = 'http://127.0.0.1:8000/api/administrador/crear/usuario';
    var colorNombre = comprobarColor(msgNombre);
    var colorCorreo = comprobarColor(msgCorreo);
    var colorContrasena = comprobarColor(msgcontrasena);
    var colorConfirmar = comprobarColor(msgconfirmarContrasena);
    var sumatorio = colorNombre + colorCorreo + colorContrasena + colorConfirmar;
    if (sumatorio == 4) {
        var token = sessionStorage.getItem("token")
        if (token != null) {
            enviarDatos(nuevoUsuario, url)
                .then(function () {
                    if (sessionStorage.getItem("acceso") == "Administrador") {
                        window.location.href = "indexAdministrador.html";
                    } else {
                        window.location.href = 'redirect.html';
                    }

                });
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var token = sessionStorage.getItem("token")
    if (token == null) {
        window.location.href = 'redirect.html';
    }
});

