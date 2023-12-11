//Manuel
//Importamos las clases que vamos a usar
import { validarNombre } from './validaciones.js';
import { comprobarColor } from './http/http-registro.js';
import { enviarDatos } from './http/http-insertarUsuarios.js';
import Componentes from './clases/Componentes.js';

//Llamamos a todas las variables que vamos a usar

//Variables de tipo input
var nombre = document.getElementById('txtnombre');
var cantidad = document.getElementById('txtcantidad');

//Varibles que notifican mensajes
var msgNombre = document.getElementById('mensajeNombre');
var msgBoton = document.getElementById('mensajeBoton');

//Botones
var btnregistro = document.getElementById('btnregistrar');

// Eventos

nombre.addEventListener('input', function(){
    if (validarNombre(nombre.value) === false){
        msgNombre.style.color = "red";
        msgNombre.innerHTML = "Nombre Incorrecto";
    }else{
        msgNombre.style.color = "green";
        msgNombre.innerHTML = "Nombre Correcto";
    }
});

//Funcionalidad boton

btnregistro.addEventListener('click', function(event){
    event.preventDefault();
    var token = sessionStorage.getItem("token")
    
    var nuevoComponente = new Componentes(nombre.value, cantidad.value); 
    const url = 'http://127.0.0.1:8000/api/administrador/crear/componente';
    var colorNombre = comprobarColor(msgNombre);
    var sumatorio = colorNombre
    if(cantidad.value != ''){
            if(sumatorio == 1){
                enviarDatos(nuevoComponente, url).then(function(){
                if (sessionStorage.getItem("acceso") == "Administrador") {
                    window.location.href="indexAdministrador.html";
                } else{
                    window.location.href = 'redirect.html';
                }
            });
       }    
    }else{
        msgBoton.style.color = "red";
        msgBoton.innerHTML = "No has introducido ninguna cantidad";
    }     
});

document.addEventListener('DOMContentLoaded', function () {
    var token = sessionStorage.getItem("token")
    if (token == null) {
        window.location.href = 'redirect.html';
    }
});