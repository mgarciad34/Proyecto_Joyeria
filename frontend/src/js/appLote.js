import { guardarElementosBdd,obtenerTipos } from "./http/http-lote.js";

let fotoUrl=sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src=fotoUrl
sessionStorage.setItem('ultimo-acceso',JSON.stringify('clasificador'))


let idLote=JSON.parse(sessionStorage.getItem('lote-a-clasificar'));
let cabecera=document.getElementById('cabecera')
let tablaInput=document.getElementById('tabla-input')
let btnAdd=document.getElementById('btnAddElement')
let btnGuardar= document.getElementById('btn-guardar')
let usuario=sessionStorage.getItem('id-usuario')
btnGuardar.disabled=true

if (idLote==null){
    tablaInput.style.display='none'
    cabecera.textContent='No se ha cargado ningun lote'
}else{
    
    cabecera.textContent='Clasificar elementos Lote Nº: '+idLote
    obtenerTipos().then(function(data){
        let desplegable=document.getElementById('tipos-habilitados')
        
        for (let i=0 ; i<data.tipos.length;i++){
            const opcion = document.createElement('option');
            opcion.value = data.tipos[i].id;
            opcion.textContent =opcion.value+'. '+data.tipos[i].nombre;
            desplegable.appendChild(opcion)
        }
        
    })

}
btnAdd.addEventListener('click',function(){
let inputTipo=document.getElementById('tipos-habilitados').value
let inputDescripcion=document.getElementById('inputDescripcion').value
let inputCantidad=document.getElementById('inputCantidad').value
let validaciones=[true]
let mensaje=''
if(inputCantidad=='' ||inputCantidad<=0){
    mensaje=mensaje+' Debe introducir una cantidad \n'
    validaciones.push(false)

}
if(inputDescripcion==''){
    mensaje=mensaje+' Debe introducir una descripcion \n'
    validaciones.push(false)
  
}
if(inputTipo==0){
    mensaje=mensaje+' Debe introducir elegir un tipo \n'
    validaciones.push(false)
    
}

if(validaciones.includes(false)){
    alert(mensaje)
}else{

   let tablaElementosRegistrados= document.getElementById('elementos-registrados')
        let fila = document.createElement('tr');
    
        let  celdaDescripcion= document.createElement('td');
        let descripcion=document.createElement('span')
        descripcion.textContent = inputDescripcion
       
        let  celdaCantidad= document.createElement('td');
        let cantidad=document.createElement('span')
        cantidad.textContent = inputCantidad

        let  celdaTipo= document.createElement('td');
      
        let tipos= document.getElementById('tipos-habilitados')
        let indiceSeleccionado = tipos.selectedIndex;

        let textoSeleccionado = tipos.options[indiceSeleccionado].textContent;
        // tipos.options[indiceSeleccionado].disabled=true
        let tipo=document.createElement('span')
        tipo.textContent=textoSeleccionado

        let botonEliminarCelda = document.createElement('td');
            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar'
            botonEliminar.style.background='red'
        
        botonEliminar.addEventListener('click',function(){
            tablaElementosRegistrados.removeChild(fila)
            if (tablaElementosRegistrados.children.length==0){
                btnGuardar.disabled=true
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
        btnGuardar.disabled=false
}
// document.getElementById('tipos-habilitados').value=0

})
btnGuardar.addEventListener('click',function(){
    let tbody=document.getElementById('elementos-registrados')
    let componentes={}
    componentes.lista=[]
    for (let i = 0; i < tbody.rows.length; i++) {
        let fila = tbody.rows[i];
        let descripcion=fila.cells[0].textContent
        let cantidad=fila.cells[1].textContent
        let tipo=fila.cells[2].textContent
        
       let componente={}
       componente['descripcion']=descripcion
       componente['cantidad']=cantidad
       componente['tipo']=tipo.split('.')[0]

       componentes.lista.push(componente)
      }
    
      componentes.usuario=usuario
guardarElementosBdd(componentes,idLote).then(function(data){
   alert('guardado correctamente')
   sessionStorage.removeItem('lote-a-clasificar')
   window.location.href='./indexClasificador.html'
    
})

})


