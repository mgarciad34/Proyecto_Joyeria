import{obtenerLotes} from './http/http-Clasificador.js'

obtenerLotes().then(function(data){
    pintarLotes(data)
    if(data.mensaje==''){
        alert('No hay lotes sin clasificar')
    }

})



function pintarLotes(lotes) {
    var tabla = document.getElementById('tabla_lotes');
        let lista =[lotes.mensaje]
        for (let i=0;i<lista[0].length;i++){
           
            let fila = document.createElement('tr');

            let botonCelda = document.createElement('td');
            let boton = document.createElement('button');
            boton.textContent = 'hola'
            boton.setAttribute('id',lista[0][i].id)

            let idCelda = document.createElement('td');

            let id= document.createElement('span');
            id.textContent=lista[0][i].id
           

            let idEmpresaCelda = document.createElement('td');
            let idEmpresa= document.createElement('span');
            idEmpresa.textContent=lista[0][i].id_empresa
           
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
        
        
    }
