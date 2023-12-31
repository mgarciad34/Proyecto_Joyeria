import {
    obtenerJoyas
} from './http/http-listadoJoyas.js'
 /**Óscar */
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('diseñador'))


obtenerJoyas().then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }
    } else {
        pintarJoyas(data)
    }

})

function pintarJoyas(joyas) {
    var tabla = document.getElementById('tabla_joyas');

    for (let i = 0; i < joyas[0].length; i++) {

        let fila = document.createElement('tr');

        let botonCelda = document.createElement('td');
        let boton = document.createElement('button');
        boton.textContent = 'recetas'
        boton.setAttribute('id', joyas[0][i].id)
        boton.classList.add('status')
        boton.classList.add('shipped')
        let idCelda = document.createElement('td');

        let id = document.createElement('span');
        id.textContent = joyas[0][i].id


        let nombreCelda = document.createElement('td');
        let nombre = document.createElement('span');
        nombre.textContent = joyas[0][i].nombre


        let fotoCelda = document.createElement('td');
        let foto = document.createElement('img');
        foto.src = joyas[0][i].foto

        let creadorCelda = document.createElement('td')
        let creador = document.createElement('span')
        creador.textContent = joyas[0][i].creador
        boton.addEventListener('click', function (event) {
            sessionStorage.setItem('joya-guardada', JSON.parse(boton.id))
            window.location.href = './receta-joya.html'

        });

        idCelda.appendChild(id)
        nombreCelda.appendChild(nombre)
        fotoCelda.appendChild(foto)
        creadorCelda.appendChild(creador)
        botonCelda.appendChild(boton);

        fila.appendChild(idCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(fotoCelda)
        fila.appendChild(creadorCelda)
        fila.appendChild(botonCelda);

        tabla.appendChild(fila);
    }


}