import { obtenerHistorial } from "./http/http-historialJoyas.js";
let barraBusqueda=document.getElementById('barra_busqueda')
let opcionesFiltrado=document.getElementById('opciones-filtrado')
let filtroFecha=document.getElementById('filtro-fecha')

opcionesFiltrado.value=1
barraBusqueda.value=''

let opcion=opcionesFiltrado.value
obtenerHistorial().then(function(data){
    pintarHistorial(data[0])

})
opcionesFiltrado.addEventListener('change',function(){
    opcion=opcionesFiltrado.value
    if(opcion==3){
        filtroFecha.style.display=''
        filtroFecha.value=''
        barraBusqueda.style.display='none'
        
    }else{
        filtroFecha.style.display='none'
        barraBusqueda.style.display=''
       barraBusqueda.value=''
    }
    filtrarHistorial(opcion)
})
filtroFecha.addEventListener('input',function(){
    filtrarHistorial(opcion)
})
barraBusqueda.addEventListener('input',function(){
    filtrarHistorial(opcion)
})
function pintarHistorial(datos) {
    var tabla = document.getElementById('tabla_historial');
       
        for(let i=0;i<datos.historial.length;i++) {
            
            let fila = document.createElement('tr');

            let idCelda = document.createElement('td');
            let id= document.createElement('span');
            id.textContent=datos.historial[i].id
           

            let joyaCelda = document.createElement('td');
            let joya= document.createElement('span');
            joya.textContent=datos.historial[i].nombre_joya
           

            let fechaCelda = document.createElement('td');
            let fecha= document.createElement('span');
            fecha.textContent=datos.historial[i].creado
            
            let usuarioCelda=document.createElement('td')
            let usuario=document.createElement('span')
            usuario.textContent=datos.historial[i].creador
          
            let fotoCelda=document.createElement('td')
            let foto=document.createElement('img')
            foto.src=datos.historial[i].foto

            idCelda.appendChild(id)
            fechaCelda.appendChild(fecha)
            usuarioCelda.appendChild(usuario)
           joyaCelda.appendChild(joya);
            fotoCelda.appendChild(foto)

           fila.appendChild(idCelda);
           fila.appendChild(joyaCelda);
           fila.appendChild(fotoCelda)
           fila.appendChild(usuarioCelda)
            fila.appendChild(fechaCelda);

            tabla.appendChild(fila);
        }
        
        
    }

    function filtrarHistorial(indice) {
        let barraBusqueda = document.getElementById('barra_busqueda');
        let filtro
        if(indice==3){
           filtro = filtroFecha.value;
        }else{
            filtro = barraBusqueda.value;
        }
       
        let contador=0
        let tabla = document.getElementById('tabla_historial');
        for(let i=0;i<tabla.rows.length;i++){
            if(filtro==''){
                tabla.rows[i].style.display=''
                contador++
            }else{
                if(!tabla.rows[i].cells[indice].textContent.toLowerCase().includes(filtro.toLowerCase())){
                    tabla.rows[i].style.display='none'
                   }else{
                    tabla.rows[i].style.display=''
                    contador++
                   }
            }

    }
        if(contador==0){
            document.getElementById('tabla-alerta').style.display=''
        }else{
            document.getElementById('tabla-alerta').style.display='none'
        }


}