import { obtenerSolicitudes,actualizarPeticion } from "./http/http-peticionesUsuarios.js"
 /**Óscar */
let tabla = document.getElementById('tabla_peticiones')

obtenerSolicitudes().then(function(data){
   
   pintarSolicitudes(data[0].peticiones)
})

function pintarSolicitudes(solicitudes){
    for(let i =0; i<solicitudes.length;i++){
        document.getElementById('tabla-vacia').style.display='none'
        let fila = document.createElement('tr')

        let idCelda=document.createElement('td')
        let id= document.createElement('span')
        id.textContent=solicitudes[i].id

        let solicitanteCelda=document.createElement('td')
        let solicitante=document.createElement('span')
        solicitante.textContent=solicitudes[i].solicitante_nombre

        let tipoCelda=document.createElement('td')
        let tipo=document.createElement('span')
        tipo.textContent=solicitudes[i].solicitud_nombre

        let solicitadoCelda=document.createElement('td')
        let solicitado=document.createElement('span')
        solicitado.textContent=solicitudes[i].solicitado_nombre

        let estadoCelda=document.createElement('td')
        let estado=document.createElement('span')
        estado.textContent=solicitudes[i].estado

        idCelda.appendChild(id)
        solicitanteCelda.appendChild(solicitante)
        tipoCelda.appendChild(tipo)
        solicitadoCelda.appendChild(solicitado)
        estadoCelda.appendChild(estado)

        fila.appendChild(idCelda)
        fila.appendChild(solicitanteCelda)
        fila.appendChild(tipoCelda)
        fila.appendChild(solicitadoCelda)
        fila.appendChild(estadoCelda)
        
        if(solicitudes[i].estado=='pendiente'){
            let botonAceptarCelda=document.createElement('td')
            let botonAceptar=document.createElement('button')
            botonAceptar.textContent='Aceptar'
            botonAceptar.classList.add('status')
            botonAceptar.classList.add('delivered')
            botonAceptarCelda.appendChild(botonAceptar)
            let botonRechazarCelda=document.createElement('td')
            let botonRechazar=document.createElement('button')
            botonRechazar.textContent='Rechazar'
            botonRechazar.classList.add('status')
            botonRechazar.classList.add('cancelled')
            botonRechazarCelda.appendChild(botonRechazar)
            
            botonAceptar.addEventListener('click',function(){
                let json={}
                json['estado']='aceptado'
                lanzarModalActualizacion(solicitudes[i].id,json)
               
            })
            fila.appendChild(botonAceptarCelda)
            fila.appendChild(botonRechazarCelda)
        }
       
        tabla.appendChild(fila)

    }
}
function lanzarModalActualizacion(id,json)
{
        let confirmar = document.getElementById('confirmarActualizacion')
        let cancelar = document.getElementById('cancelarActualizacion')
        let alerta = document.getElementById('alertaActualizacion')
        document.getElementById('modal').style.display = 'flex';

        cancelar.addEventListener('click', function () {
            document.getElementById('modal').style.display = 'none';
        });

        confirmar.addEventListener('click', function () {
           
            confirmar.style.display='none'
            actualizarPeticion(id,JSON.stringify(json)).then(function (data) {
                alerta.textContent = data.mensaje
                cancelar.textContent='Continuar'
                cancelar.addEventListener('click',function(){

                    window.location.reload()
                })
            })

        });
    
}