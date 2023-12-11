import {
    guardarElementosBdd,
    obtenerTipos
} from "./http/http-lote.js";
 /**Óscar */
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('clasificador'))


let idLote = JSON.parse(sessionStorage.getItem('lote-a-clasificar'));
let cabecera = document.getElementById('cabecera')
let tablaInput = document.getElementById('tabla-input')
let btnAdd = document.getElementById('btnAddElement')
let btnGuardar = document.getElementById('btn-guardar')
let usuario = sessionStorage.getItem('id-usuario')
btnGuardar.disabled = true

cabecera.textContent = 'Clasificar elementos Lote Nº: ' + idLote

if (idLote == null && usuario != null) {
    window.location.reload('./redirect.html')
} else {

    obtenerTipos().then(function (data) {
        if (data == 202 || data == 302) {
            if (data == 202) {
                window.location.href = './redirect.html'
            } else {
                window.location.href = '../index.html'
            }

        } else {

            let desplegable = document.getElementById('tipos-habilitados')

            for (let i = 0; i < data.tipos.length; i++) {
                const opcion = document.createElement('option');
                opcion.value = data.tipos[i].id;
                opcion.textContent = opcion.value + '. ' + data.tipos[i].nombre;
                desplegable.appendChild(opcion)
            }
        }

    })

}
btnAdd.addEventListener('click', function () {
    let inputTipo = document.getElementById('tipos-habilitados').value
    let inputDescripcion = document.getElementById('inputDescripcion').value
    let inputCantidad = document.getElementById('inputCantidad').value
    let validaciones = [true]
    let mensaje = ''
    if (inputCantidad == '' || inputCantidad <= 0) {
        mensaje = mensaje + ' Debe introducir una cantidad <br>'
        validaciones.push(false)

    }
    if (inputDescripcion == '') {
        mensaje = mensaje + ' Debe introducir una descripción <br>'
        validaciones.push(false)

    }
    if (inputTipo == 0) {
        mensaje = mensaje + ' Debe introducir elegir un tipo <br>'
        validaciones.push(false)

    }

    if (validaciones.includes(false)) {
        lanzarModalErrores(mensaje)
    } else {

        let tablaElementosRegistrados = document.getElementById('elementos-registrados')
        let fila = document.createElement('tr');

        let celdaDescripcion = document.createElement('td');
        let descripcion = document.createElement('span')
        descripcion.textContent = inputDescripcion

        let celdaCantidad = document.createElement('td');
        let cantidad = document.createElement('span')
        cantidad.textContent = inputCantidad

        let celdaTipo = document.createElement('td');

        let tipos = document.getElementById('tipos-habilitados')
        let indiceSeleccionado = tipos.selectedIndex;

        let textoSeleccionado = tipos.options[indiceSeleccionado].textContent;
        // tipos.options[indiceSeleccionado].disabled=true
        let tipo = document.createElement('span')
        tipo.textContent = textoSeleccionado

        let botonEliminarCelda = document.createElement('td');
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar'
        boton.classList.add('status')
        boton.classList.add('cancelled')

        botonEliminar.addEventListener('click', function () {
            tablaElementosRegistrados.removeChild(fila)
            if (tablaElementosRegistrados.children.length == 0) {
                btnGuardar.disabled = true
            }
        })

        celdaDescripcion.appendChild(descripcion)
        celdaCantidad.appendChild(cantidad)
        celdaTipo.appendChild(tipo);
        botonEliminarCelda.appendChild(botonEliminar);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaTipo);
        fila.appendChild(botonEliminarCelda)
        tablaElementosRegistrados.appendChild(fila);
        btnGuardar.disabled = false
    }
    // document.getElementById('tipos-habilitados').value=0

})
btnGuardar.addEventListener('click', function () {
    lanzarModalGuardado()

})

function lanzarModalGuardado() {
    let alerta=document.getElementById('alertaGuardado')
    let confirmar=document.getElementById('confirmarGuardado')
    let cancelar=document.getElementById('cancelarGuardado')
    document.getElementById('modal').style.display = 'flex';


    cancelar.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    confirmar.addEventListener('click', function () {
        let tbody = document.getElementById('elementos-registrados')
        let componentes = {}
        componentes.lista = []
        for (let i = 0; i < tbody.rows.length; i++) {
            let fila = tbody.rows[i];
            let descripcion = fila.cells[0].textContent
            let cantidad = fila.cells[1].textContent
            let tipo = fila.cells[2].textContent
    
            let componente = {}
            componente['descripcion'] = descripcion
            componente['cantidad'] = cantidad
            componente['tipo'] = tipo.split('.')[0]
    
            componentes.lista.push(componente)
        }
        componentes.usuario = usuario
        cancelar.style.display='none'
        alerta.textContent='Guardando lote...'
        guardarElementosBdd(componentes, idLote).then(function (data) {
     
            alerta.textContent=data.mensaje
            confirmar.textContent='continuar'
            confirmar.addEventListener('click',function(){

                sessionStorage.removeItem('lote-a-clasificar')
                document.getElementById('modal').style.display = 'none';
                window.location.href = './indexClasificador.html'

            })
    
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