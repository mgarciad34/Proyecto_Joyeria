import {
  obtenerJoyas,
  eliminarJoya
} from './http/http-listadoJoyasUsuario.js'
 /**Óscar */
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('diseñador'))

let id = JSON.parse(sessionStorage.getItem('id-usuario'))

obtenerJoyas(id).then(function (data) {
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
    boton.textContent = 'receta'
    boton.setAttribute('id', joyas[0][i].id)
    boton.classList.add('status')
    boton.classList.add('delivered')
    let botonEliminarCelda = document.createElement('td');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar'
    botonEliminar.setAttribute('id', joyas[0][i].id)
    botonEliminar.classList.add('status')
    botonEliminar.classList.add('cancelled')


    let botonModificarCelda = document.createElement('td');
    let botonModificar = document.createElement('button');
    botonModificar.textContent = 'Modificar'
    botonModificar.setAttribute('id', joyas[0][i].id)
    botonModificar.classList.add('status')
    botonModificar.classList.add('pending')

    let idCelda = document.createElement('td');

    let id = document.createElement('span');
    id.textContent = joyas[0][i].id


    let nombreCelda = document.createElement('td');
    let nombre = document.createElement('span');
    nombre.textContent = joyas[0][i].nombre


    let fotoCelda = document.createElement('td');
    let foto = document.createElement('img');
    foto.src = joyas[0][i].foto

    botonModificar.addEventListener('click', function () {
      sessionStorage.setItem('joya-guardada', JSON.parse(botonModificar.id))
      window.location.href = './modificarJoya.html'
    })

    boton.addEventListener('click', function (event) {
      sessionStorage.setItem('joya-guardada', JSON.parse(boton.id))
      window.location.href = './receta-joya.html'

    });

    botonEliminar.addEventListener('click', function (event) {

        lanzarModalBorrado(joyas[0][i].id)

    });


    idCelda.appendChild(id)
    nombreCelda.appendChild(nombre)
    fotoCelda.appendChild(foto)
    botonCelda.appendChild(boton);
    botonEliminarCelda.appendChild(botonEliminar);
    botonModificarCelda.appendChild(botonModificar)


    fila.appendChild(idCelda);
    fila.appendChild(nombreCelda);
    fila.appendChild(fotoCelda)
    fila.appendChild(botonCelda);
    fila.appendChild(botonModificarCelda)
    fila.appendChild(botonEliminarCelda);

    tabla.appendChild(fila);
  }


}
function lanzarModalBorrado(joya) {
  let alerta=document.getElementById('alertaGuardado')
  let confirmar=document.getElementById('confirmarGuardado')
  let cancelar=document.getElementById('cancelarGuardado')
  document.getElementById('modal').style.display = 'flex';

  cancelar.addEventListener('click', function () {
      document.getElementById('modal').style.display = 'none';
  });

  confirmar.addEventListener('click', function () {

      cancelar.style.display='none'
      alerta.textContent='Boraando joya...'
      eliminarJoya(joya).then(function (data) {
   
          alerta.textContent=data.mensaje
        
          confirmar.textContent='Continuar'
          confirmar.addEventListener('click',function(){

              document.getElementById('modal').style.display = 'none';
              window.location.reload()

          })
  
      })
   

  });
}