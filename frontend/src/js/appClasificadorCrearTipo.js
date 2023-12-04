import {
    obtenerTipos,registrarComponente
} from "./http/http-crearTiposClasificador.js";

let tabla = document.getElementById('tabla_tipos');
let inputNombre = document.getElementById('inputNombre');
let inputCantidad = document.getElementById('inputCantidad')
let btnAdd = document.getElementById('btnAdd')
const tipos = []
inputCantidad.value = 0
inputNombre.value = ''

obtenerTipos().then(function (data) {
    pintarTipos(data);

});
btnAdd.addEventListener('click', function () {
    let nombre = inputNombre.value
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1)
    let validaciones = [true]
    let mensaje = ''
    if (!comprobarVacio(inputNombre.value)) {
        validaciones.push(false)
        mensaje = mensaje + ' Debe introducir un nombre \n'
    }
    if (!comprobarVacio(inputCantidad.value) || inputCantidad.value < 0) {
        validaciones.push(false)
        mensaje = mensaje + ' Debe introducir una cantidad valida \n'
    }
    if (!revisarTipos(nombre, tipos)) {
        validaciones.push(false)
        mensaje = mensaje + ' Debe introducir un nombre no registrado \n'
    }
    if (validaciones.includes(false)) {
        lanzarModalErrores(mensaje)
    } else {
        let componente = {}
        componente.nombre = nombre
        componente.cantidad = inputCantidad.value
        lanzarModalGuardado(componente)

    }
})

function pintarTipos(data) {

    for (let i = 0; i < data.tipos.length; i++) {
        const fila = document.createElement('tr');
        let nombreCelda = document.createElement('td');
        let nombre = document.createElement('span');
        nombre.textContent = data.tipos[i].nombre;
        tipos.push(data.tipos[i].nombre)
        let cantidadCelda = document.createElement('td');
        let cantidad = document.createElement('span');
        cantidad.textContent = data.tipos[i].cantidad;

        nombreCelda.appendChild(nombre);
        cantidadCelda.appendChild(cantidad);

        fila.appendChild(nombreCelda);
        fila.appendChild(cantidadCelda);
        tabla.appendChild(fila);

    }


}

function revisarTipos(nombre, tipos) {
    let nuevo = true
    let i = 0
    while (nuevo && i < tipos.length) {
        if (tipos[i] == nombre) {
            nuevo = false
        }
        i++
    }
    return nuevo
}

function comprobarVacio(input) {
    let e = input != ''
    return e
}

function lanzarModalGuardado(json) {

    document.getElementById('modal').style.display = 'flex';
    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });
    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        console.log(JSON.stringify(json))
        registrarComponente(json).then(function (data) {
            document.getElementById('modal').style.display = 'none';
            console.log(data.message)
            if(data.codigo==400){
                lanzarModalErrores(data.message)
            }else{

                lanzarModalPeticion(data.message)
            }
        })  

    });
}

function lanzarModalErrores(mensaje) {

    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').innerHTML = mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click', function () {
        document.getElementById('modal-errores').style.display = 'none';
    })
}

function lanzarModalPeticion(mensaje) {

    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').innerHTML = mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click', function () {
        document.getElementById('modal-errores').style.display = 'none';
        window.location.reload(true)
    })
}