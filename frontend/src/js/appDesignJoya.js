import {
    obtenerTipos,
    guardarNuevaJoya,
    subirFoto,
    generarNuevaReceta
} from "./http/http-designJoya.js"


let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('diseñador'))

let formData = null
let btnAdd = document.getElementById('btnNuevoElementoReceta')
let inputNombre = document.getElementById('inputNombre')
let inputFoto = document.getElementById('inputFoto')
let btnGuardar = document.getElementById('btn-guardar')
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let btnGeneradorRecetas = document.getElementById('btnGenerarReceta')
let carga = document.getElementById('carga')



document.getElementById('formulario').reset()
inputNombre.value = ''
btnAdd.disabled = true
btnGuardar.disabled = true
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
inputNombre.addEventListener('input', function () {
    if (!elementoVacio(inputNombre.id)) {
        btnAdd.disabled = false
    } else {
        btnAdd.disabled = true
    }
    if (elementoVacio(inputFoto.id) || elementoVacio(inputNombre.id)) {
        btnAdd.disabled = true
        btnGuardar.disabled = true
    } else {
        if (!tablaVacia(document.getElementById('detalle-receta'))) {
            btnGuardar.disabled = false
        }
    }

})

inputFoto.addEventListener('change', function (event) {
    var input = event.target;

    if (input.files && input.files[0]) {
        var fotoUrl2 = URL.createObjectURL(input.files[0]);
        document.getElementById('lblFoto').style.background = 'url(' + fotoUrl2 + ') center / cover'
        sessionStorage.setItem('nueva-foto', JSON.stringify(fotoUrl2))

    }
    carga.classList.remove('spinner');
    void carga.offsetWidth;
    carga.classList.add('spinner');
    formData = new FormData(document.getElementById('formulario'));
    console.log(formData)
    if (!elementoVacio(inputFoto.id)) {
        btnAdd.disabled = false

    } else {
        btnAdd.disabled = true
    }
    if (elementoVacio(inputFoto.id) || elementoVacio(inputNombre.id)) {
        btnAdd.disabled = true
        btnGuardar.disabled = true
    } else {
        if (!tablaVacia(document.getElementById('detalle-receta'))) {
            btnGuardar.disabled = false
        }
    }


})
btnGuardar.addEventListener('click', function () {
    let tbody = document.getElementById('detalle-receta')
    let joya = {}

    joya.nombre = inputNombre.value
    joya.foto = inputFoto.value
    joya.id_usuario = usuario
    joya.detalle = []


    for (let i = 0; i < tbody.rows.length; i++) {
        let fila = tbody.rows[i];
        let cantidad = fila.cells[1].textContent
        let tipo = fila.cells[0].textContent

        let componente = {}
        componente['cantidad'] = cantidad
        componente['tipo'] = tipo.split('.')[0]

        joya.detalle.push(componente)
    }

    lanzarModalGuardado(joya)


})


btnAdd.addEventListener('click', function () {
    let inputTipo = document.getElementById('tipos-habilitados').value

    let inputCantidad = document.getElementById('inputCantidad').value
    let validaciones = [true]
    let mensaje = ''

    if (inputCantidad == '' || inputCantidad.includes('-') || inputCantidad == '0') {
        mensaje = mensaje + ' Debe introducir una cantidad \n'
        validaciones.push(false)

    }

    if (inputTipo == 0) {
        mensaje = mensaje + ' Debe introducir elegir un tipo \n'
        validaciones.push(false)

    }

    if (validaciones.includes(false)) {
        lanzarModalErrores(mensaje)
    } else {

        let tablaElementosRegistrados = document.getElementById('detalle-receta')
        let fila = document.createElement('tr');


        let celdaCantidad = document.createElement('td');
        let cantidad = document.createElement('span')
        cantidad.textContent = inputCantidad

        let celdaTipo = document.createElement('td');

        let tipos = document.getElementById('tipos-habilitados')
        let indiceSeleccionado = tipos.selectedIndex;
        let textoSeleccionado = tipos.options[indiceSeleccionado].textContent
        tipos.options[indiceSeleccionado].disabled = true
        document.getElementById('opcion-default').selected = true
        let tipo = document.createElement('span')
        tipo.textContent = textoSeleccionado

        celdaTipo.appendChild(tipo);
        celdaCantidad.appendChild(cantidad)


        fila.appendChild(celdaTipo);
        fila.appendChild(celdaCantidad);

        tablaElementosRegistrados.appendChild(fila);
        btnGuardar.disabled = false
    }
})
btnGeneradorRecetas.addEventListener('click', function () {
    generarNuevaReceta().then(function (data) {
        console.log(data.receta[0])
        lanzarModalGenerador(data);
    })
})

function elementoVacio(id) {
    let elemento = document.getElementById(id)
    let vacio = false
    if (elemento.value == '') {
        vacio = true
    }
    return vacio
}

function tablaVacia(tabla) {
    let vacia = true
    if (tabla.children.length > 0) {
        vacia = false
    }
    return vacia
}

function lanzarModalGuardado(joya) {

    document.getElementById('modal').style.display = 'flex';


    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        guardarNuevaJoya(joya).then(function (data) {
            if (data == 202 || data == 302) {
                if (data == 202) {
                    window.location.href = './redirect.html'
                } else {
                    window.location.href = '../index.html'
                }

            } else {

                let formulario = document.getElementById('formulario')
                subirFoto(formulario, data.id).then(function (data) {
                    console.log(data)
                    formulario.reset()
                    window.location.href = 'listaJoyas.html'
                })
            }
        })
        document.getElementById('modal').style.display = 'none';

    });
}

function lanzarModalErrores(mensaje) {
    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').textContent = mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click', function () {
        document.getElementById('modal-errores').style.display = 'none';
    })
}

function lanzarModalGenerador(data) {
    let nueva = document.getElementById('nuevaGenerador')
    let cancelar = document.getElementById('cancelarGenerador')
    let aplicar = document.getElementById('aplicarGenerador')
    let alerta = document.getElementById('alertaGenerador')
    alerta.innerHTML = ''
    document.getElementById('modal-generador').style.display = 'flex';
    if (data.receta) {
        let componente = ''
        for (let i = 0; i < data.receta.length; i++) {

            componente += 'Componente: ' + data.receta[i].nombre + ' Cantidad: ' + data.receta[i].cantidad + '<br>'
            console.log(componente)
        }
        alerta.innerHTML = componente
    } else {
        alerta.textContent = data.mensaje
    }

    cancelar.addEventListener('click', function () {
        document.getElementById('modal-generador').style.display = 'none';
    });
    nueva.addEventListener('click', function () {
        alerta.innerHTML = ''
        document.getElementById('modal-generador').style.display = 'none';
        generarNuevaReceta().then(function (data) {
            lanzarModalGenerador(data)
        })
    })
    aplicar.addEventListener('click', function () {
        aplicarReceta(data)
        document.getElementById('modal-generador').style.display = 'none';
    })

}

function aplicarReceta(data) {
    let tablaElementosRegistrados = document.getElementById('detalle-receta')
    let tiposHabilitados = document.getElementById('tipos-habilitados')
    for (let x = 1; x < tiposHabilitados.options.length; x++) {
            tiposHabilitados.options[x].disabled = false
    }
    tablaElementosRegistrados.innerHTML = ''
    for (let i = 0; i < data.receta.length; i++) {

        let fila = document.createElement('tr');


        let celdaCantidad = document.createElement('td');
        let cantidad = document.createElement('span')
        cantidad.textContent = data.receta[i].cantidad

        let celdaTipo = document.createElement('td');
        let tipo = document.createElement('span')
        tipo.textContent = data.receta[i].id + '. ' + data.receta[i].nombre

        celdaTipo.appendChild(tipo);
        celdaCantidad.appendChild(cantidad)


        fila.appendChild(celdaTipo);
        fila.appendChild(celdaCantidad);

        tablaElementosRegistrados.appendChild(fila);
        btnGuardar.disabled = false

        console.log(tiposHabilitados.options[1].textContent)
       
        for (let x = 1; x < tiposHabilitados.options.length; x++) {
            if (tipo.textContent == tiposHabilitados.options[x].textContent) {
                tiposHabilitados.options[x].disabled = true
            }
        }
    }
}