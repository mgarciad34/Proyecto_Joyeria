import { obtenerRecetas, fabricarJoya } from './http/http-receta-joya.js'
let joya=sessionStorage.getItem('joya-guardada')
let btnFabricar=document.getElementById('btnFabricar')
let disponible=true

obtenerRecetas(joya).then(function (data) {
    pintarRecetas(data)
})
btnFabricar.addEventListener('click',function(){
    if(!disponible){
        alert('Recursos insuficientes')
    }else{
        var resultado = confirm("¿Estás seguro de que deseas continuar?");
        if(resultado){

        let id_joya=JSON.parse(sessionStorage.getItem('joya-guardada'))
        let usuario=JSON.parse(sessionStorage.getItem('id-usuario'))
      
            fabricarJoya(id_joya,usuario).then(function(data){
                
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

        let cNecesariaCelda=document.createElement('td')
        let cantidadNecesaria=document.createElement('span')
        cantidadNecesaria.textContent=recetas.detalle[i].cantidad_necesaria


        let cDisponibleCelda=document.createElement('td')
        let cantidadDisponible=document.createElement('span')
        cantidadDisponible.textContent=recetas.detalle[i].cantidad_disponible


        if(recetas.detalle[i].cantidad_disponible<recetas.detalle[i].cantidad_necesaria){
            cantidadDisponible.style.color='red'
            disponible=false
            btnFabricar.disabled=true
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