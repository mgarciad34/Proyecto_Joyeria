const apiUrl2='http://127.0.0.1:8000/api/consultar/tipos'



let btnAdd=document.getElementById('btnNuevoElementoReceta')
let inputNombre=document.getElementById('inputNombre')
let inputFoto=document.getElementById('inputFoto')
let btnGuardar=document.getElementById('btn-guardar')

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
inputNombre.addEventListener('input',function(){
   if(!elementoVacio(inputNombre.id)){
    btnAdd.disabled=false
   }else{
    btnAdd.disabled=true
   }
   if(elementoVacio(inputFoto.id) ||elementoVacio(inputNombre.id)){
    btnGuardar.disabled=true
}else{
    if(!tablaVacia(document.getElementById('detalle-receta'))){
        btnGuardar.disabled=false
    }
}

})

inputFoto.addEventListener('input',function(){
    if(!elementoVacio(inputFoto.id)){
     btnAdd.disabled=false

    }else{
     btnAdd.disabled=true
    }
    if(elementoVacio(inputFoto.id) ||elementoVacio(inputNombre.id)){
        btnGuardar.disabled=true
    }else{
        if(!tablaVacia(document.getElementById('detalle-receta'))){
            btnGuardar.disabled=false
        }
    }
 
 })
 btnGuardar.addEventListener('click',function(){
    let tbody=document.getElementById('detalle-receta')
    let joya={}
    joya.nombre=inputNombre.value
    joya.foto=inputFoto.value
    joya.detalle=[]


    for (let i = 0; i < tbody.rows.length; i++) {
        let fila = tbody.rows[i];
        let cantidad=fila.cells[1].textContent
        let tipo=fila.cells[0].textContent
        
       let componente={}
       componente['cantidad']=cantidad
       componente['tipo']=tipo.split('.')[0]

       joya.detalle.push(componente)
      }
      console.log(JSON.stringify(joya))
// guardarNuevaJoya(joya).then(function(data){
//    alert('guardado correctamente')
    
// })

})


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

async function guardarNuevaJoya(joya){
    let url=127
    const options={
        method: "POST",
        headers:{
            'Content-Type' : 'aplication/json'
      },
      body: JSON.stringify(joya)
    }
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

btnAdd.addEventListener('click',function(){
    let inputTipo=document.getElementById('tipos-habilitados').value
   
    let inputCantidad=document.getElementById('inputCantidad').value
    let validaciones=[true]
    let mensaje=''
    if(inputCantidad==''){
        mensaje=mensaje+' Debe introducir una cantidad \n'
        validaciones.push(false)
    
    }
 
    if(inputTipo==0){
        mensaje=mensaje+' Debe introducir elegir un tipo \n'
        validaciones.push(false)
        
    }
    
    if(validaciones.includes(false)){
        alert(mensaje)
    }else{
    
       let tablaElementosRegistrados= document.getElementById('detalle-receta')
            let fila = document.createElement('tr');
        
           
            let  celdaCantidad= document.createElement('td');
            let cantidad=document.createElement('span')
            cantidad.textContent = inputCantidad
    
            let  celdaTipo= document.createElement('td');
          
            let tipos= document.getElementById('tipos-habilitados')
            let indiceSeleccionado = tipos.selectedIndex;
            let textoSeleccionado = tipos.options[indiceSeleccionado].textContent;
            let tipo=document.createElement('span')
            tipo.textContent=textoSeleccionado
            
            celdaTipo.appendChild(tipo);
            celdaCantidad.appendChild(cantidad)
           
    
            fila.appendChild(celdaTipo);
            fila.appendChild(celdaCantidad);
           
            tablaElementosRegistrados.appendChild(fila);
            btnGuardar.disabled=false
    }
    })

    function elementoVacio(id){
        let elemento= document.getElementById(id)
        let vacio=false
        if(elemento.value==''){
            vacio=true
        }
        return vacio
    }

    function tablaVacia(tabla){
        if(tabla.children.length==0){
            console.log('vacia')
        }else{
            console.log('tiene elementos')
        }
    }