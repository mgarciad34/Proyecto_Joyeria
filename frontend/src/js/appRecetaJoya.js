import { obtenerRecetas } from './http/http-receta-joya.js'
let joya=sessionStorage.getItem('joya-guardada')

obtenerRecetas(joya).then(function (data) {
    pintarRecetas(data)
})


function pintarRecetas(recetas) {
    let tabla = document.getElementById('tabla_receta');
    
    for (let i = 0; i < recetas[0].length; i++) {
        
        let fila = document.createElement('tr');

        let botonCelda = document.createElement('td');
        let boton = document.createElement('button');
        boton.textContent = 'Detalle'
        boton.setAttribute('id', recetas[0][i].id)

        let idCelda = document.createElement('td');

        let id = document.createElement('span');
        id.textContent = recetas[0][i].id


        let usuarioCelda = document.createElement('td');
        let usuario = document.createElement('span');
        usuario.textContent = recetas[0][i].id_usuario




        boton.addEventListener('click', function (event) {
            sessionStorage.setItem('receta-guardada', JSON.parse(boton.id))
            window.location.href = './detalle-receta.html'

        });

        idCelda.appendChild(id)
        usuarioCelda.appendChild(usuario)

        botonCelda.appendChild(boton);

        fila.appendChild(idCelda);
        fila.appendChild(usuarioCelda);

        fila.appendChild(botonCelda);

        tabla.appendChild(fila);
    }


}