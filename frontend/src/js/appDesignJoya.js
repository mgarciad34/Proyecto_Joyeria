import { obtenerTipos,guardarNuevaJoya, subirFoto } from "./http/http-designJoya.js"


let fotoUrl=sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src=fotoUrl
sessionStorage.setItem('ultimo-acceso',JSON.stringify('diseñador'))

let formData= null
let btnAdd = document.getElementById('btnNuevoElementoReceta')
let inputNombre = document.getElementById('inputNombre')
let inputFoto = document.getElementById('inputFoto')
let btnGuardar = document.getElementById('btn-guardar')
let usuario=JSON.parse(sessionStorage.getItem('id-usuario'))

let carga= document.getElementById('carga')



document.getElementById('formulario').reset()
inputNombre.value=''
btnAdd.disabled=true
btnGuardar.disabled=true
obtenerTipos().then(function (data) {
    let desplegable = document.getElementById('tipos-habilitados')
    
    for (let i = 0; i < data.tipos.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = data.tipos[i].id;
        opcion.textContent = opcion.value + '. ' + data.tipos[i].nombre;
        desplegable.appendChild(opcion)
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
        document.getElementById('lblFoto').style.background='url('+fotoUrl2+') center / cover'
        sessionStorage.setItem('nueva-foto',JSON.stringify(fotoUrl2))

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
    joya.id_usuario=usuario
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
    let mensaje =''
   
    if (inputCantidad == ''|| inputCantidad.includes('-') ||inputCantidad=='0') {
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
function lanzarModalGuardado(joya){

document.getElementById('modal').style.display = 'flex';
  
  
  document.getElementById('cancelarGuardado').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
  });
  
  document.getElementById('confirmarGuardado').addEventListener('click', function() {
    guardarNuevaJoya(joya).then(function (data) {
        let formulario=document.getElementById('formulario')
                subirFoto(formulario,data.id).then(function(data){
                    console.log(data)
                    formulario.reset()
                    window.location.href='listaJoyas.html'
                })
            })
    document.getElementById('modal').style.display = 'none';

  });
}

function lanzarModalErrores(mensaje){
    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').textContent=mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click',function(){
        document.getElementById('modal-errores').style.display = 'none';
    })
}