import {
    obtenerRecetas,
    fabricarJoya,
    isOwner,
    eliminarJoya
} from './http/http-receta-joya.js'
let id_joya = JSON.parse(sessionStorage.getItem('joya-guardada'));
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let botones = document.getElementById('botones')
let btnFabricar = document.getElementById('btnFabricar')
let disponible = true

obtenerRecetas(id_joya).then(function (data) {
    pintarRecetas(data)
})
isOwner(id_joya, usuario).then(function (data) {
    console.log(data)
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
        console.log(recetas.detalle[i])
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



        idCelda.appendChild(id)
        tipoCelda.appendChild(tipo)
        cNecesariaCelda.appendChild(cantidadNecesaria);
        cDisponibleCelda.appendChild(cantidadDisponible);

        fila.appendChild(idCelda);
        fila.appendChild(tipoCelda);
        fila.appendChild(cNecesariaCelda);
        fila.appendChild(cDisponibleCelda);

        tabla.appendChild(fila);
    }


}

function addOwnerBotones() {

    let botonEliminarCelda = document.createElement('td');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar'
    botonEliminar.setAttribute('id',id_joya)
    botonEliminar.style.backgroundColor = ' red'
    botonEliminar.addEventListener('click', function (event) {

        let resultado = confirm('¿Estas seguro que deseas eliminar esta joya? ')

        if (resultado) {
            eliminarJoya(id_joya).then(function(){
                window.location.href='./listaJoyas.html'

            })
        }

    });

    let botonModificarCelda = document.createElement('td');
    let botonModificar = document.createElement('button');
    botonModificar.textContent = 'Modificar'
    botonModificar.setAttribute('id',id_joya)
    botonModificar.style.backgroundColor = ' orange'
    botonModificar.addEventListener('click', function (event) {
        sessionStorage.setItem('joya-guardada',JSON.parse(botonModificar.id))
       window.location.href='./modificarJoya.html'

    });
    botonEliminarCelda.appendChild(botonEliminar)
    botonModificarCelda.appendChild(botonModificar)

    botones.appendChild(botonEliminarCelda)
    botones.appendChild(botonModificarCelda)

}