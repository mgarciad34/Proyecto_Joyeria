

const apiUrl='http://127.0.0.1:8000/api/consultarLoteId/'
const apiUrl2='http://127.0.0.1:8000/api/consultar/tipos'

let idLote=JSON.parse(sessionStorage.getItem('lote-a-clasificar'));
let cabecera=document.getElementById('cabecera')
let tablaInput=document.getElementById('tabla-input')
let btnAdd=document.getElementById('btnAdd')

console.log(idLote)
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
            opcion.textContent = data.tipos[i].nombre;
            desplegable.appendChild(opcion)
        }
        
    })

}
// btnAdd.addEventListener('click',function(){
// let inputTipo=document.getElementById('tipos-habilitados').value
// let inputDescripcion


// })
async function obtenerTipos(){
    try {
                const response = await fetch(apiUrl2);
                if (!response.ok) {
                    throw new Error('No se pudo obtener las categorias');
                }
        
                const data = await response.json();
                
                return data
            } catch (error) {
                return false
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
