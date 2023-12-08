import {
    obtenerRecetas,
    fabricarJoya,
    isOwner,
    eliminarJoya
} from './http/http-receta-joya.js'
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('diseñador'))

let id_joya = JSON.parse(sessionStorage.getItem('joya-guardada'));
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let botones = document.getElementById('botones')
let btnFabricar = document.getElementById('btnFabricar')
let disponible = true
console.log(id_joya)
obtenerRecetas(id_joya).then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }
    } else {
        document.getElementById('nombreJoya').textContent=data.nombre
        pintarRecetas(data)
    }
})
isOwner(id_joya, usuario).then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }
    } else {
        if (data.resultado) {
            addOwnerBotones()
        }
    }

})
btnFabricar.addEventListener('click', function () {
    if (!disponible) {
        lanzarModalErrores('Recursos insuficientes')
    } else {
        lanzarModal(1);

    }
})

function pintarRecetas(recetas) {
    let tabla = document.getElementById('tabla_receta');
    for (let i = 0; i < recetas.detalle.length; i++) {

        let fila = document.createElement('tr');

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

        tipoCelda.appendChild(tipo)
        cNecesariaCelda.appendChild(cantidadNecesaria);
        cDisponibleCelda.appendChild(cantidadDisponible);
        cDisponibleCelda.setAttribute('colspan','4')
      
        fila.appendChild(tipoCelda);
        fila.appendChild(cNecesariaCelda);
        fila.appendChild(cDisponibleCelda);


        tabla.appendChild(fila);
    }


}

function addOwnerBotones() {

    let botonEliminarCelda = document.getElementById('botonEliminarOculto');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar'
    botonEliminar.setAttribute('id', id_joya)
    botonEliminar.classList.add('status')
    botonEliminar.classList.add('cancelled')

    botonEliminar.addEventListener('click', function (event) {

         lanzarModal(2)


    });

    let botonModificarCelda = document.getElementById('botonModificarOculto');
    let botonModificar = document.createElement('button');
    botonModificar.textContent = 'Modificar'
    botonModificar.setAttribute('id', id_joya)
    botonModificar.classList.add('status')
    botonModificar.classList.add('pending')

    botonModificar.addEventListener('click', function (event) {
        sessionStorage.setItem('joya-guardada', JSON.parse(botonModificar.id))
        window.location.href = './modificarJoya.html'

    });
    botonEliminarCelda.appendChild(botonEliminar)
    botonModificarCelda.appendChild(botonModificar)


}

function lanzarModal(accion) {
    let alerta = document.getElementById('alertaModal')
    let confirmar = document.getElementById('confirmarGuardado')
    let cancelar = document.getElementById('cancelarGuardado')
    document.getElementById('modal').style.display = 'flex';


    cancelar.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });
    if (accion == 1) {
        alerta.textContent = '¿Esta seguro que desea continuar?.'
        confirmar.addEventListener('click', function () {
            cancelar.style.display = 'none'
            alerta.textContent = 'Fabricando...'
            fabricarJoya(id_joya, usuario).then(function (data) {

                alerta.textContent = 'Fabricado correctamente'
                confirmar.textContent = 'Continuar'
                confirmar.addEventListener('click', function () {

                    document.getElementById('modal').style.display = 'none';
                    window.location.reload()

                })

            })


        });



    } else {
        alerta.textContent = '¿Esta seguro que desea eliminar la joya?.'
        confirmar.addEventListener('click', function () {
            cancelar.style.display = 'none'
            alerta.textContent = 'Eliminando joya..'
            eliminarJoya(id_joya).then(function (data) {

                alerta.textContent = data.mensaje
                confirmar.textContent = 'Continuar'
                confirmar.addEventListener('click', function () {

                    document.getElementById('modal').style.display = 'none';
                    window.location.reload()

                })

            })


        });

    }
}

function lanzarModalErrores(mensaje) {
    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').innerHTML = mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click', function () {
        document.getElementById('modal-errores').style.display = 'none';
    })
}