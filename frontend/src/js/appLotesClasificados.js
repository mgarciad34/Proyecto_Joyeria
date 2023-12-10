import {
    obtenerLotes
} from "./http/http-lotesClasificados.js";

let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('clasificador'))

obtenerLotes().then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }

    } else {

        pintarLotes(data)
    }

})


function pintarLotes(lotes) {
    var tabla = document.getElementById('tabla_lotes');
    // let lista =[lotes.mensaje]

    for (let i = 0; i < lotes[0].lotes.length; i++) {
        let fila = document.createElement('tr');

        let botonCelda = document.createElement('td');
        let boton = document.createElement('button');
        boton.textContent = 'Despiece'
        boton.setAttribute('id', lotes[0].lotes[i].id)
        boton.classList.add('status')
        boton.classList.add('shipped')

        let idCelda = document.createElement('td');

        let id = document.createElement('span');
        id.textContent = lotes[0].lotes[i].id


        let idEmpresaCelda = document.createElement('td');
        let idEmpresa = document.createElement('span');
        idEmpresa.textContent = lotes[0].lotes[i].colaborador

        let ubicacionCelda = document.createElement('td');
        let ubicacion = document.createElement('a');
        let direccion = lotes[0].lotes[i].latitud + ',' + lotes[0].lotes[i].longitud;
        ubicacion.href = 'https://www.google.com/maps?q=' + direccion;
        ubicacion.target = '_blank';
        ubicacion.textContent = direccion;


        let clasificadorCelda = document.createElement('td')
        let clasificador = document.createElement('span')
        clasificador.textContent = lotes[0].lotes[i].clasificador
        boton.addEventListener('click', function (event) {
            sessionStorage.setItem('despiece-lote', JSON.parse(boton.id))
            window.location.href = './despieceLote.html'

        });
        idCelda.appendChild(id)
        idEmpresaCelda.appendChild(idEmpresa)
        botonCelda.appendChild(boton);
        ubicacionCelda.appendChild(ubicacion)
        clasificadorCelda.appendChild(clasificador)
        fila.appendChild(idCelda);
        fila.appendChild(idEmpresaCelda);
        fila.appendChild(ubicacionCelda)
        fila.appendChild(clasificadorCelda)
        fila.appendChild(botonCelda);

        tabla.appendChild(fila);
    }


}