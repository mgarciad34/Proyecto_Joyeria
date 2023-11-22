import{obtenerJoyas} from './http/http-listadoJoyasUsuario.js'
let id=JSON.parse(sessionStorage.getItem('id-usuario'))

obtenerJoyas(id).then(function(data){
    pintarJoyas(data)
})


function pintarJoyas(joyas) {
    var tabla = document.getElementById('tabla_joyas');
        console.log(joyas)
        for(let i=0;i<joyas[0].length;i++) {
            console.log(joyas[0][i])
            let fila = document.createElement('tr');

            let botonCelda = document.createElement('td');
            let boton = document.createElement('button');
            boton.textContent = 'receta'
            boton.setAttribute('id',joyas[0][i].id)

            let botonEliminarCelda = document.createElement('td');
            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar'
            botonEliminar.setAttribute('id',joyas[0][i].id)
            botonEliminar.style.backgroundColor=' red'


            let idCelda = document.createElement('td');

            let id= document.createElement('span');
            id.textContent=joyas[0][i].id
           

            let nombreCelda = document.createElement('td');
            let nombre= document.createElement('span');
            nombre.textContent=joyas[0][i].nombre
           

            let fotoCelda = document.createElement('td');
            let foto= document.createElement('span');
            foto.textContent=joyas[0][i].foto


            boton.addEventListener('click', function(event) {
                sessionStorage.setItem('joya-guardada',JSON.parse(boton.id))
                window.location.href='./receta-joya.html'
                
              });

            botonEliminar.addEventListener('click', function(event) {
                sessionStorage.setItem('joya-guardada',JSON.parse(boton.id))

              let resultado=  confirm('¿Estas seguro que deseas eliminar esta joya? ')

              if(resultado){

                eliminarJoya(joyas[0][i].id).then(function(){
                    window.location.href='./listaJoyasUsuario.html'

                })
                
              }
                
              });
            

            idCelda.appendChild(id)
            nombreCelda.appendChild(nombre)
            fotoCelda.appendChild(foto)
           botonCelda.appendChild(boton);
           botonEliminarCelda.appendChild(botonEliminar);

           fila.appendChild(idCelda);
           fila.appendChild(nombreCelda);
           fila.appendChild(fotoCelda)
            fila.appendChild(botonCelda);
            fila.appendChild(botonEliminarCelda);
            tabla.appendChild(fila);
        }
        
        
    }