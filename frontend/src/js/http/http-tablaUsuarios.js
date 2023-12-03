//Importamos las validaciones
import { validarNombre,validarCorreo } from "../validaciones.js";
import { enviarDatos } from "../http/http-modificarUsuario.js";
import modificarUsers from '../clases/modificarUsers.js';

export function crearCelda(valor) {
    const celda = document.createElement('td');
    celda.textContent = valor;
    return celda;
}

export function crearBoton(texto, color, clickHandler) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.classList.add('btn', `btn-${color}`);
    boton.addEventListener('click', clickHandler);
    
    return boton;
}


export function mostrarModal(usuarios, modificar, cerrar) {
    console.log(usuarios)
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const myInputNombre = document.getElementById('txtnombre');
    const myInputEmail = document.getElementById('txtemail');
    var msgNombre = document.getElementById('mensajeNombre');
    var msgCorreo = document.getElementById('mensajeCorreo');

    myInputNombre.value = usuarios.name;
    myInputEmail.value = usuarios.email;
    

    myModal.show();

    myModal._element.addEventListener('shown.bs.modal', () => {
        myInput.focus();


    });
    
    myInputNombre.addEventListener('input', function(){
        if (validarNombre(myInputNombre.value) === false){
            msgNombre.style.color = "red";
            msgNombre.innerHTML = "Nombre Incorrecto";
        }else{
            msgNombre.style.color = "green";
            msgNombre.innerHTML = "Nombre Correcto";
            usuarios.name = myInputNombre.value;
        }
    });

    myInputEmail.addEventListener('input', function(){
        if (validarCorreo(myInputEmail.value) === false){
            msgCorreo.style.color = "red";
            msgCorreo.innerHTML = "Correo Incorrecto";
        }else{
            msgCorreo.style.color = "green";
            msgCorreo.innerHTML = "Correo Correcto";
            usuarios.email = myInputEmail.value
        }
    });

    modificar.addEventListener("click", function () {
        var url = 'http://127.0.0.1:8000/api/administrador/modificar/usuario/'+usuarios.id;
        var modificarUsuario = new modificarUsers(usuarios.name, usuarios.email);
        enviarDatos(modificarUsuario, url);
        myModal.hide();
    })
    
    cerrar.addEventListener("click", function () {
        myModal.hide();
    });
}