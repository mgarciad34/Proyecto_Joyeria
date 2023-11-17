

const apiUrl1 = 'http://127.0.0.1:8000/api/consultarLotes'


obtenerLotes().then(function(data){
    pintarLotes(data)
    if(data.mensaje==''){
        alert('No hay lotes sin clasificar')
    }

})

async function obtenerLotes() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/consultarLotes');
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}


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
