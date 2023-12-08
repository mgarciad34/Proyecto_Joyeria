import {
    obtenerJoyas,
    fabricarJoya,
    recomendacionesJoya
} from './http/http-fabricarJoya.js'
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('diseñador'))
let recomendador=document.getElementById('btnRecomendador')
let parametros=document.getElementById('parametros')
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
recomendador.addEventListener('click',function(){
    lanzarModalRecomendador()
})

function pintarJoyas(joyas) {
    var tabla = document.getElementById('tabla_joyas');

    for (let i = 0; i < joyas[0].length; i++) {

        let fila = document.createElement('tr');

        let botonCelda = document.createElement('td');
        let boton = document.createElement('button');
        boton.textContent = 'Fabricar'
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

        let fabricacionesCelda = document.createElement('td')
        let fabricaciones = document.createElement('span')
        fabricaciones.textContent = joyas[0][i].fabricaciones

        boton.addEventListener('click', function (event) {
            fabricarJoya(boton.id, usuario).then(function () {

                window.location.reload()
            }).catch(function (error) {
                window.location.href = '../index.html'
            });

        });

        idCelda.appendChild(id)
        nombreCelda.appendChild(nombre)
        fotoCelda.appendChild(foto)
        creadorCelda.appendChild(creador)
        botonCelda.appendChild(boton);
        fabricacionesCelda.appendChild(fabricaciones)

        fila.appendChild(idCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(fotoCelda)
        fila.appendChild(creadorCelda)
        fila.appendChild(fabricacionesCelda)
        fila.appendChild(botonCelda);

        tabla.appendChild(fila);
    }


}

function lanzarModalRecomendador() {

    document.getElementById('modal').style.display = 'flex';


    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        let parametro = parametros.value 
        console.log(parametro)
        recomendacionesJoya(parametro).then(function(data){
            
        })

        document.getElementById('modal').style.display = 'none';

    });
}

