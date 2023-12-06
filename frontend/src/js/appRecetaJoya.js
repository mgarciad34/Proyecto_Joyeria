import {
    obtenerRecetas,
    fabricarJoya,
    isOwner,
    eliminarJoya
} from './http/http-receta-joya.js'
let fotoUrl=sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src=fotoUrl
sessionStorage.setItem('ultimo-acceso',JSON.stringify('diseñador'))

let id_joya = JSON.parse(sessionStorage.getItem('joya-guardada'));
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let botones = document.getElementById('botones')
let btnFabricar = document.getElementById('btnFabricar')
let disponible = true

obtenerRecetas(id_joya).then(function (data) {
    pintarRecetas(data)
})
isOwner(id_joya, usuario).then(function (data) {
    
    if (data.resultado) {
        addOwnerBotones()
        
    }

})
btnFabricar.addEventListener('click', function () {
    if (!disponible) {
        alert('Recursos insuficientes')
    } else {
        var resultado = confirm("¿Estás seguro de que deseas continuar?");
        if (resultado) {

            
            fabricarJoya(id_joya, usuario).then(function (data) {
               
                window.location.reload()
            })
        }
    }
})

function pintarRecetas(recetas) {
    let tabla = document.getElementById('tabla_receta');

    for (let i = 0; i < recetas.detalle.length; i++) {
     
        let fila = document.createElement('tr');

        let idCelda = document.createElement('td');
        let id = document.createElement('span');
        id.textContent = recetas.detalle[i].id_componente


        let tipoCelda = document.createElement('td');
        let tipo = document.createElement('span');
        tipo.textContent = recetas.detalle[i].tipo

        let cNecesariaCelda = document.createElement('td')
        let cantidadNecesaria = document.createElement('span')
        cantidadNecesaria.textContent = recetas.detalle[i].cantidad_necesaria


        let cDisponibleCelda = document.createElement('td')
        let cantidadDisponible = document.createElement('span')
        cantidadDisponible.textContent = recetas.detalle[i].cantidad_disponible


        if (recetas.detalle[i].cantidad_disponible < recetas.detalle[i].cantidad_necesaria) {
            cantidadDisponible.style.color = 'red'
            disponible = false
            btnFabricar.disabled = true
        }

        let rellenoCelda = document.createElement('td')
        let relleno=document.createElement('span')
        relleno.textContent=''
        rellenoCelda.appendChild(relleno)

        let rellenoCelda2 = document.createElement('td')
        let relleno2=document.createElement('span')
        relleno2.textContent=''
        rellenoCelda2.appendChild(relleno2)

        let rellenoCelda3 = document.createElement('td')
        let relleno3=document.createElement('span')
        relleno3.textContent=''
        rellenoCelda3.appendChild(relleno3)

  

        idCelda.appendChild(id)
        tipoCelda.appendChild(tipo)
        cNecesariaCelda.appendChild(cantidadNecesaria);
        cDisponibleCelda.appendChild(cantidadDisponible);

        fila.appendChild(idCelda);
        fila.appendChild(tipoCelda);
        fila.appendChild(cNecesariaCelda);
        fila.appendChild(cDisponibleCelda);
        fila.appendChild(rellenoCelda)
        fila.appendChild(rellenoCelda2)
        fila.appendChild(rellenoCelda3)
        
        tabla.appendChild(fila);
    }


}

function addOwnerBotones() {

    let botonEliminarCelda = document.getElementById('botonEliminarOculto');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar'
    botonEliminar.setAttribute('id',id_joya)
    botonEliminar.classList.add('status')
    botonEliminar.classList.add('cancelled')

    botonEliminar.addEventListener('click', function (event) {

        let resultado = confirm('¿Estas seguro que deseas eliminar esta joya? ')

        if (resultado) {
            eliminarJoya(id_joya).then(function(){
                window.location.href='./listaJoyas.html'

            })
        }

    });

    let botonModificarCelda = document.getElementById('botonModificarOculto');
    let botonModificar = document.createElement('button');
    botonModificar.textContent = 'Modificar'
    botonModificar.setAttribute('id',id_joya)
    botonModificar.classList.add('status')
    botonModificar.classList.add('pending')

    botonModificar.addEventListener('click', function (event) {
        sessionStorage.setItem('joya-guardada',JSON.parse(botonModificar.id))
       window.location.href='./modificarJoya.html'

    });
    botonEliminarCelda.appendChild(botonEliminar)
    botonModificarCelda.appendChild(botonModificar)


}