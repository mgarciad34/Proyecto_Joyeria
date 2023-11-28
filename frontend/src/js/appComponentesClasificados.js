import{obtenerAllDespiece} from './http/http-componentesClasificados.js'

obtenerAllDespiece().then(function(data){
    pintarDespiece(data.componentes)
    

})



function pintarDespiece(componentes) {
    console.log(componentes)
    var tabla = document.getElementById('tabla_componentes');
    
        for (let i=0;i<componentes.length;i++){
            let fila = document.createElement('tr');

            let descripcionCelda = document.createElement('td');
            let descripcion= document.createElement('span');
            descripcion.textContent=componentes[i].descripcion

            let idEmpresaCelda = document.createElement('td');
            let idEmpresa= document.createElement('span');
            idEmpresa.textContent=componentes[i].id_empresa

            let tipoCelda = document.createElement('td');
            let tipo= document.createElement('span');
            tipo.textContent=componentes[i].tipo

            let cantidadCelda = document.createElement('td');
            let cantidad= document.createElement('span');
            cantidad.textContent=componentes[i].cantidad
           
            let idLoteCelda = document.createElement('td');
            let idLote= document.createElement('span');
            idLote.textContent=componentes[i].id_lote

            let idClasificadorCelda = document.createElement('td');
            let idClasificador= document.createElement('span');
            idClasificador.textContent=componentes[i].id_clasificador
            
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
