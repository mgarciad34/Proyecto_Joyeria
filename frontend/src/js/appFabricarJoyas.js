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
    let alerta=document.getElementById('alertaRecomendacion')
    let cancelar=document.getElementById('cancelarRecomendacion')
    let confirmar=document.getElementById('confirmarRecomendacion')
    let cargar=document.getElementById('cargarRecomendacion')
    let foto= document.getElementById('fotoJoya')
    let enlace=document.getElementById('enlaceReceta')
    document.getElementById('modal').style.display = 'flex';


    cancelar.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
        enlace.href=''
        foto.style.display='none'
    });

    confirmar.addEventListener('click', function () {
        let parametro = parametros.value 
        parametros.style.display='none'
        alerta.textContent='Cargando recomendaciones...'
        confirmar.style.display='none'
        recomendacionesJoya(parametro).then(function(data){
            cargar.style.display=''
            cancelar.textContent='Cerrar'
            let recomendaciones=data[0]
            alerta.textContent='Recomendaciones cargadas'
            
            let i=0
            cargar.addEventListener('click',function(){
                foto.style.display=''
                foto.src=recomendaciones[i].foto
                let r=recomendaciones[i]
                alerta.textContent=recomendaciones[i].id
                enlace.addEventListener('click',function(){
                    
                    sessionStorage.setItem('joya-guardada',recomendaciones[i].id)
                    
                    window.location.href='./receta-joya.html'
                })
                cargar.addEventListener('click',function(){
                    i++
                    if(i==recomendaciones.length){
                        i=0
                    }
                })


            })
           
           
        })

        // document.getElementById('modal').style.display = 'none';

    });
}

