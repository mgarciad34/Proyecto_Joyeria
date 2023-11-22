import { obtenerTipos,obtenerJoya,obtenerRecetas,actualizarJoya } from "./http/http-modificarJoya.js";
let idJoya=JSON.parse(sessionStorage.getItem('joya-guardada'))
let tiposEnUso=[]
let joya_original={
    nombre:'',
    foto:'',
    detalle: [],
}
let btnAdd = document.getElementById('btnNuevoElementoReceta')
let inputNombre = document.getElementById('inputNombre')
let inputFoto = document.getElementById('inputFoto')
let btnGuardar = document.getElementById('btn-guardar')
let usuario=JSON.parse(sessionStorage.getItem('id-usuario'))
let desplegable = document.getElementById('tipos-habilitados')

obtenerJoya(idJoya).then(function(data){
    inputNombre.value=data.nombre
    inputFoto.value=data.foto
    joya_original.nombre=data.nombre
    joya_original.foto=data.foto
})
obtenerRecetas(idJoya).then(function(data){
    pintarRecetas(data)

})
obtenerTipos().then(function (data) {
    pintarTipos(data)
    revisarTipos()
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

inputFoto.addEventListener('input', function () {
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
    if(joya.detalle.length==0){

        alert('No puedes guardar una joya sin receta')

    }else{

        let resultado = window.confirm("¿Estás seguro de que deseas actualizar esta joya?");
        if (resultado) {
           
           let json={joya_original,joya}
            actualizarJoya(idJoya,json).then(function () {
                
                window.location.href='listaJoyasUsuario.html'
            })
            
        }
    }

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
        alert(mensaje)
    } else {

        let tablaElementosRegistrados = document.getElementById('detalle-receta')
        let fila = document.createElement('tr');


        let celdaCantidad = document.createElement('td');
        let cantidad = document.createElement('input')
        cantidad.value = inputCantidad

        let celdaTipo = document.createElement('td');

        let tipos = document.getElementById('tipos-habilitados')
        let indiceSeleccionado = tipos.selectedIndex;
        let textoSeleccionado = tipos.options[indiceSeleccionado].textContent
        let eliminarCelda=document.createElement('td')
        let eliminar=document.createElement('button')
        eliminar.textContent='Eliminar'
        eliminar.style.backgroundColor='red'
        eliminar.addEventListener('click',function(){
            eliminarFila(fila)
            revisarTipos()
        })

        tiposEnUso.push(parseInt(tipos.value))
    
        tipos.options[indiceSeleccionado].disabled = true

        document.getElementById('opcion-default').selected = true
        let tipo = document.createElement('span')
        tipo.textContent = textoSeleccionado

        celdaTipo.appendChild(tipo);
        celdaCantidad.appendChild(cantidad)
        eliminarCelda.appendChild(eliminar)

        fila.appendChild(celdaTipo);
        fila.appendChild(celdaCantidad);
        fila.appendChild(eliminarCelda)

        tablaElementosRegistrados.appendChild(fila);
        btnGuardar.disabled = false
    }
   
})
function pintarTipos(data){
   
    for (let i = 0; i < data.tipos.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = data.tipos[i].id;
        opcion.textContent = opcion.value + '. ' + data.tipos[i].nombre;
        desplegable.appendChild(opcion)
    }

}
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
function pintarRecetas(recetas) {
    let tabla = document.getElementById('detalle-receta');
    
    for (let i = 0; i < recetas.detalle.length; i++) {
        console.log(recetas.detalle[i])
        let fila = document.createElement('tr');

        let tipoCelda = document.createElement('td');
        let tipo = document.createElement('span');
        tipo.textContent = recetas.detalle[i].id_componente+'. '+recetas.detalle[i].tipo

        let cNecesariaCelda=document.createElement('td')
        let cantidadNecesaria=document.createElement('input')
        cantidadNecesaria.value=recetas.detalle[i].cantidad_necesaria

        let eliminarCelda=document.createElement('td')
        let eliminar=document.createElement('button')
        eliminar.textContent='Eliminar'
        eliminar.style.backgroundColor='red'
        eliminar.addEventListener('click',function(){
            eliminarFila(fila)
            revisarTipos()
        })
        
        let aux={
            id_componente:recetas.detalle[i].id_componente,
            cantidad:recetas.detalle[i].cantidad_necesaria
        }
        tiposEnUso.push(parseInt(recetas.detalle[i].id_componente))
        joya_original.detalle.push(aux)

        
        tipoCelda.appendChild(tipo)
        cNecesariaCelda.appendChild(cantidadNecesaria);
        eliminarCelda.appendChild(eliminar)

        fila.appendChild(tipoCelda);
        fila.appendChild(cNecesariaCelda);
        fila.appendChild(eliminarCelda)
        

        tabla.appendChild(fila);
    }



}

function revisarTipos(){
    for (let i = 1; i < desplegable.options.length; i++) {
        var opcion = desplegable.options[i];
        console.log(tiposEnUso)
       if(tiposEnUso.includes(parseInt(opcion.value))){
        opcion.disabled=true
       }else{
        opcion.disabled=false
       }
    }
}

function eliminarFila(fila){
    let tipo= parseInt(fila.cells[0].textContent.split('.')[0])
    document.getElementById('detalle-receta').removeChild(fila)
    let indice=tiposEnUso.indexOf(tipo)
    tiposEnUso.splice(indice)
    console.log(tiposEnUso)
}