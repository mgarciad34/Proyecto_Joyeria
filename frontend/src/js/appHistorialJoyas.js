import { obtenerHistorial } from "./http/http-historialJoyas.js";

obtenerHistorial().then(function(data){
    pintarHistorial(data[0])

})
function pintarHistorial(datos) {
    var tabla = document.getElementById('tabla_historial');
        console.log(datos)
        for(let i=0;i<datos.historial.length;i++) {
            
            let fila = document.createElement('tr');

            let idCelda = document.createElement('td');
            let id= document.createElement('span');
            id.textContent=datos.historial[i].id
           

            let joyaCelda = document.createElement('td');
            let joya= document.createElement('span');
            joya.textContent=datos.historial[i].id_joya
           

            let fechaCelda = document.createElement('td');
            let fecha= document.createElement('span');
            fecha.textContent=datos.historial[i].creado
            
            let usuarioCelda=document.createElement('td')
            let usuario=document.createElement('span')
            usuario.textContent=datos.historial[i].id_usuario
          

            idCelda.appendChild(id)
            fechaCelda.appendChild(fecha)
            usuarioCelda.appendChild(usuario)
           joyaCelda.appendChild(joya);

           fila.appendChild(idCelda);
           fila.appendChild(joyaCelda);
           fila.appendChild(usuarioCelda)
            fila.appendChild(fechaCelda);

            tabla.appendChild(fila);
        }
        
        
    }