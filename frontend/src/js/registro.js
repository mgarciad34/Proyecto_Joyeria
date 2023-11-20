// Importamos las clases a utilizar
import Users from '../js/clases/Users.js';
import { validarNombre, validarCorreo, validarContrasena, confirmarContrasena } from './validaciones.js';
import { enviarDatos } from './http/http-registro.js';

// Variables a rellenar
var nombre = document.getElementById('nombre');
var correo = document.getElementById('email'); // Corregido aquí
var rol = document.getElementById('rol');
var contrasena = document.getElementById('password');
var repetirContrasena = document.getElementById('confirmPassword');
var btnregistro = document.getElementById('registrarse');

// Variables de notificaciones
var mensajeContrasena = document.getElementById('messagePassword');

// Funcionalidades
function comprobarContrasena(contrasena) {
    var contrasenaTam = contrasena.length;
    var validacion = true;

    if (contrasenaTam < 6 || contrasenaTam > 12) {
        validacion = false;
        mensajeContrasena.style.color = "red";
        mensajeContrasena.innerHTML = "El tamaño debe de ser entre 6 y 12<br>";
    } 
    if (validarContrasena(contrasena) === false) {
        validacion = false;
        mensajeContrasena.style.color = "red";
        mensajeContrasena.innerHTML += "El formato de contraseña no es válido";
    } 
    if (validacion === true) {
        mensajeContrasena.style.color = "green";
        mensajeContrasena.innerHTML = "Contraseña válida";
    }
    return validacion;
}

// -------------------- LISTENERS --------------------
// Comprobación dinámica de la contraseña cuando se genera un cambio en el formulario
contrasena.addEventListener('input', function(){
    comprobarContrasena(contrasena.value);
});

btnregistro.addEventListener('click', function(event){
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    var mensaje = ""; // Declarar mensaje antes de su uso
    if (validarNombre(nombre.value) === false){
        mensaje += "Nombre incorrecto \n";
    }
    if (validarCorreo(correo.value) === false){
        mensaje += "Correo incorrecto \n";
    }
    if (comprobarContrasena(contrasena.value) === false){
        mensaje += "Contraseña incorrecta \n";
    }
    if (confirmarContrasena(contrasena.value, repetirContrasena.value) === false){
        mensaje += "Las contraseñas introducidas son diferentes";
    }

    // Hacer algo con el mensaje (mostrar alerta, enviar a un servidor, etc.)
    if (mensaje === "") {
        var registrarUsuario = new Users(nombre.value, correo.value, contrasena.value); 
        const url = 'http://127.0.0.1:8000/api/usuarios';
        enviarDatos(registrarUsuario, url);
        window.location.href = "../index.html";
    } else {
        alert(mensaje);
    }
});