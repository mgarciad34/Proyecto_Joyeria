


const apiUrl='http://127.0.0.1:8000/api/consultarLoteId/'
const apiUrl2='http://127.0.0.1:8000/api/consultar/tipos'
const apiUrlEnviar='http://127.0.0.1:8000/api/lote/clasificar/'

let idLote=JSON.parse(sessionStorage.getItem('lote-a-clasificar'));
let cabecera=document.getElementById('cabecera')
let tablaInput=document.getElementById('tabla-input')
let btnAdd=document.getElementById('btnAddElement')
let btnGuardar= document.getElementById('btn-guardar')

btnGuardar.disabled=true
console.log(idLote)
if (idLote==null){
    tablaInput.style.display='none'
    cabecera.textContent='No se ha cargado ningun lote'
}else{
    
    cabecera.textContent='Clasificar elementos Lote Nº: '+idLote
    obtenerTipos().then(function(data){
        let desplegable=document.getElementById('tipos-habilitados')
        console.log(data)
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
if(inputCantidad==''){
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
        let tipo=document.createElement('span')
        tipo.textContent=textoSeleccionado
        celdaDescripcion.appendChild(descripcion)
        celdaCantidad.appendChild(cantidad)
        celdaTipo.appendChild(tipo);

        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaTipo);
        tablaElementosRegistrados.appendChild(fila);
        btnGuardar.disabled=false
}
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
      
guardarElementosBdd(componentes).then(function(data){
   alert('guardado correctamente')
    
})

})
async function guardarElementosBdd(elementos){
    let url=apiUrlEnviar+idLote
    const options={
        method: "POST",
        headers:{
            'Content-Type' : 'aplication/json'
      },
      body: JSON.stringify(elementos)
    }
    try {
       
        const response = await fetch(url,options);
       
        if (!response.ok) {
            throw new Error('No se pudo guardar la clasificacion');
        }

        const data = await response.json();
        
        return data
    } catch (error) {
        return error
    }
}

async function obtenerTipos(){
    try {
                const response = await fetch(apiUrl2);
                if (!response.ok) {
                    throw new Error('No se pudo obtener las categorias');
                }
        
                const data = await response.json();
                
                return data
            } catch (error) {
                return error
            }
}

// obtenerLotes().then(function(data){
//     pintarLotes(data)

// })

// async function obtenerLotes() {
//     try {
//         const response = await fetch(apiUrl1);
//         if (!response.ok) {
//             throw new Error('No se pudo obtener las categorias');
//         }

//         const data = await response.json();
        
//         return data

//     } catch (error) {
//         return false
//     }
// }


// function insertarFila(lotes) {
//     var tabla = document.getElementById('tabla_componentes');
        
//         lotes.mensaje.forEach(function (lote) {
//             console.log(lote.id)
//             let fila = document.createElement('tr');

//             let botonCelda = document.createElement('td');
//             let boton = document.createElement('button');
//             boton.textContent = 'añadir'
//             boton.setAttribute('id',lote.id)

//             let idCelda = document.createElement('td');

//             let id= document.createElement('span');
//             id.textContent=lote.id
           

//             let idEmpresaCelda = document.createElement('td');
//             let idEmpresa= document.createElement('span');
//             idEmpresa.textContent=lote.id_empresa
           
//             boton.addEventListener('click', function(event) {
//                 localStorage.setItem('id-lote-a-clasificar',JSON.parse(boton.id))
//                 window.location.href='./lote/index.html'
                
//               });

//             idCelda.appendChild(id)
//             idEmpresaCelda.appendChild(idEmpresa)
//            botonCelda.appendChild(boton);
//            fila.appendChild(idCelda);
//            fila.appendChild(idEmpresaCelda);
           
//             fila.appendChild(botonCelda);
//             tabla.appendChild(fila);
//         }
//         )
        
//     }
