//Manuel
//Importamos las validaciones
import Componentes from "../clases/Componentes.js";
import { validarNombre,validarCorreo } from "../validaciones.js";
import { enviarDatos } from "./http-modificarComponente.js";

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


export function mostrarModal(tipos, modificar, cerrar) {
    
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const myInputNombre = document.getElementById('txtnombre');
    const myInputCantidad = document.getElementById('txtnumero');
    var msgNombre = document.getElementById('mensajeNombre');
    var msgNumero = document.getElementById('mensajeNumero');

    myInputNombre.value = tipos.nombre;
    myInputCantidad.value = tipos.cantidad;
    

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
            tipos.nombre = myInputNombre.value;
        }
    });

    myInputCantidad.addEventListener('input', function(){
        if (myInputCantidad.value < 0){
            msgNumero.style.color = "red";
            msgNumero.innerHTML = "No puedes introducir una cantidad inferior a 0";
        }else{
            msgNumero.style.color = "green";
            msgNumero.innerHTML = "Cantidad agregada";
            tipos.cantidad = myInputCantidad.value
        }
    });

    modificar.addEventListener("click", function () {
        var url = 'http://127.0.0.1:8000/api/administrador/modificar/componente/'+tipos.id;
        var modificarComponente = new Componentes(tipos.nombre, tipos.cantidad);
   
        enviarDatos(modificarComponente, url);
        myModal.hide();
        window.location.href="indexAdministrador.html";
    })
    
    cerrar.addEventListener("click", function () {
        myModal.hide();
    });
}