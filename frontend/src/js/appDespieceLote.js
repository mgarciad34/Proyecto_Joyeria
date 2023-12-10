import {
    obtenerDespiece
} from './http/http-despieceLote.js'
let idLote = JSON.parse(sessionStorage.getItem('despiece-lote'))


let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('clasificador'))

obtenerDespiece(idLote).then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }

    } else {

        pintarDespiece(data[0].despiece)
    }


})



function pintarDespiece(despiece) {

    var tabla = document.getElementById('tabla_despiece');

    for (let i = 0; i < despiece.length; i++) {
        let fila = document.createElement('tr');

        let descripcionCelda = document.createElement('td');
        let descripcion = document.createElement('span');
        descripcion.textContent = despiece[i].descripcion

        let tipoCelda = document.createElement('td');
        let tipo = document.createElement('span');
        tipo.textContent = despiece[i].tipo

        let cantidadCelda = document.createElement('td');
        let cantidad = document.createElement('span');
        cantidad.textContent = despiece[i].cantidad


        descripcionCelda.appendChild(descripcion)
        tipoCelda.appendChild(tipo)
        cantidadCelda.append(cantidad)

        fila.appendChild(descripcionCelda)
        fila.appendChild(tipoCelda)
        fila.appendChild(cantidadCelda)

        tabla.appendChild(fila);
    }


}