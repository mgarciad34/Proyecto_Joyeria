import{obtenerLotes} from './http/http-Clasificador.js'

obtenerLotes().then(function(data){
    pintarLotes(data)
    if(data.mensaje==''){
        alert('No hay lotes sin clasificar')
    }

})



function pintarLotes(lotes) {
    var tabla = document.getElementById('tabla_lotes');
        console.log(lotes)
        lotes.mensaje.forEach(function (lote) {
            console.log(lote.id)
            let fila = document.createElement('tr');

            let botonCelda = document.createElement('td');
            let boton = document.createElement('button');
            boton.textContent = 'hola'
            boton.setAttribute('id',lote.id)

            let idCelda = document.createElement('td');

            let id= document.createElement('span');
            id.textContent=lote.id
           

            let idEmpresaCelda = document.createElement('td');
            let idEmpresa= document.createElement('span');
            idEmpresa.textContent=lote.id_empresa
           
            boton.addEventListener('click', function(event) {
                sessionStorage.setItem('lote-a-clasificar',JSON.parse(boton.id))
                window.location.href='./indexLote.html'
                
              });

            idCelda.appendChild(id)
            idEmpresaCelda.appendChild(idEmpresa)
           botonCelda.appendChild(boton);
           fila.appendChild(idCelda);
           fila.appendChild(idEmpresaCelda);
           
            fila.appendChild(botonCelda);
            tabla.appendChild(fila);
        }
        )
        
    }
