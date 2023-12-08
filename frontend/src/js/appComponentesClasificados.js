import {
    obtenerAllDespiece
} from './http/http-componentesClasificados.js'

let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('clasificador'))

obtenerAllDespiece().then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }

    } else {

    }
    pintarDespiece(data.componentes)
    

})



function pintarDespiece(componentes) {

    var tabla = document.getElementById('tabla_componentes');

    for (let i = 0; i < componentes.length; i++) {
        let fila = document.createElement('tr');

        let descripcionCelda = document.createElement('td');
        let descripcion = document.createElement('span');
        descripcion.textContent = componentes[i].descripcion

        let idEmpresaCelda = document.createElement('td');
        let idEmpresa = document.createElement('span');
        idEmpresa.textContent = componentes[i].id_empresa

        let tipoCelda = document.createElement('td');
        let tipo = document.createElement('span');
        tipo.textContent = componentes[i].categoria

        let cantidadCelda = document.createElement('td');
        let cantidad = document.createElement('span');
        cantidad.textContent = componentes[i].cantidad

        let idLoteCelda = document.createElement('td');
        let idLote = document.createElement('a');
        idLote.textContent = componentes[i].id_lote
        idLote.href='./despieceLote.html'
        idLote.addEventListener('click',function(event){
            event.preventDefault()
            sessionStorage.setItem('despiece-lote', componentes[i].id_lote)
            window.location.href='./despieceLote.html'
        })
        let idClasificadorCelda = document.createElement('td');
        let idClasificador = document.createElement('span');
        idClasificador.textContent = componentes[i].clasificador

        descripcionCelda.appendChild(descripcion)
        idEmpresaCelda.appendChild(idEmpresa)
        tipoCelda.appendChild(tipo)
        cantidadCelda.appendChild(cantidad)
        idLoteCelda.appendChild(idLote)
        idClasificadorCelda.appendChild(idClasificador)

        fila.appendChild(descripcionCelda)
        fila.appendChild(idEmpresaCelda)
        fila.appendChild(tipoCelda)
        fila.appendChild(cantidadCelda)
        fila.appendChild(idLoteCelda)
        fila.appendChild(idClasificadorCelda)

        tabla.appendChild(fila);
    }


}