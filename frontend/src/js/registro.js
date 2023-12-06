// Manuel
// Importamos las clases a utilizar
import Users from '../js/clases/Users.js';
import { validarNombre, validarCorreo, validarContrasena, confirmarContrasena } from './validaciones.js';
import { enviarDatos, comprobarColor } from './http/http-registro.js';

// Variables a rellenar
var nombre = document.getElementById('nombre');
var correo = document.getElementById('email'); 
var contrasena = document.getElementById('password');
var repetirContrasena = document.getElementById('confirmPassword');
var btnregistro = document.getElementById('registrarse');

// Variables de notificaciones
var mensajeContrasena = document.getElementById('messagePassword');
var mensajeContrasenaConfirmar = document.getElementById('messagePasswordConfirm');
var mensajeNombre = document.getElementById('messageName');
var mensajeEmail = document.getElementById('messageEmail');
//Variables de los validadores


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

nombre.addEventListener('input', function(){
    if (validarNombre(nombre.value) === false){
        mensajeNombre.style.color = "red";
        mensajeNombre.innerHTML = "Nombre Incorrecto";
    }else{
        mensajeNombre.style.color = "green";
        mensajeNombre.innerHTML = "Nombre Correcto";
    }
});

correo.addEventListener('input', function(){
    if (validarCorreo(correo.value) === false){
        mensajeEmail.style.color = "red";
        mensajeEmail.innerHTML = "Correo Incorrecto";
    }else{
        mensajeEmail.style.color = "green";
        mensajeEmail.innerHTML = "Correo Correcto";
    }
});

contrasena.addEventListener('input', function(){
    comprobarContrasena(contrasena.value);
});

repetirContrasena.addEventListener('input', function(){
    var result = confirmarContrasena(contrasena.value, repetirContrasena.value)
   
    if(result === true){
        mensajeContrasenaConfirmar.style.color = "green";
        mensajeContrasenaConfirmar.innerHTML = "Las contraseñas coinciden";
    }else{
        mensajeContrasenaConfirmar.style.color = "red";
        mensajeContrasenaConfirmar.innerHTML = "Las contraseñas no coinciden";
    }
});


btnregistro.addEventListener('click', function(event){
    event.preventDefault();
    var nuevoUsuario = new Users(nombre.value, correo.value, contrasena.value); 
  
    const url = 'http://127.0.0.1:8000/api/usuarios';
    var colorNombre = comprobarColor(mensajeNombre)
    var colorCorreo = comprobarColor(mensajeEmail)
    var colorContrasena = comprobarColor(mensajeContrasena)
    var colorConfirmar = comprobarColor(mensajeContrasenaConfirmar)
    var sumatorio = colorNombre + colorCorreo + colorContrasena + colorConfirmar;
    if(sumatorio == 4){
            enviarDatos(nuevoUsuario, url).then(function(){
            window.location.href="../index.html";
        });
        
    }    
});



