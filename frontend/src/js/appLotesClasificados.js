import { obtenerLotes } from "./http/http-lotesClasificados";
obtenerLotes.then(function(data){
    pintarLotes(data)

})


function pintarLotes(lotes) {
    var tabla = document.getElementById('tabla_lotes');
        // let lista =[lotes.mensaje]
   
        for (let i=0;i<lotes[0].lotes.length;i++){
            let fila = document.createElement('tr');

            let botonCelda = document.createElement('td');
            let boton = document.createElement('button');
            boton.textContent = 'Clasificar'
            boton.setAttribute('id',lotes[0].lotes[i].id)

            let idCelda = document.createElement('td');

            let id= document.createElement('span');
            id.textContent=lotes[0].lotes[i].id
           

            let idEmpresaCelda = document.createElement('td');
            let idEmpresa= document.createElement('span');
            idEmpresa.textContent=lotes[0].lotes[i].id_empresa
           
            let ubicacionCelda = document.createElement('td');
            let ubicacion= document.createElement('span');
            ubicacion.textContent=lotes[0].lotes[i].ubicacion

            let clasificadorCelda=document.createElement('td')
            let clasificador=documetn.createElement('span')
            clasificador=lotes[0].lotes[i].id_clasificador

            boton.addEventListener('click', function(event) {
                sessionStorage.setItem('lote-a-clasificar',JSON.parse(boton.id))
                window.location.href='./indexLote.html'
                
              });
            idCelda.appendChild(id)
            idEmpresaCelda.appendChild(idEmpresa)
           botonCelda.appendChild(boton);
           ubicacionCelda.appendChild(ubicacion)
           
           fila.appendChild(idCelda);
           fila.appendChild(idEmpresaCelda);
           fila.appendChild(ubicacionCelda)
            fila.appendChild(botonCelda);
         
            tabla.appendChild(fila);
        }
        
        
    }
