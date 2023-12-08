import { obtenerDatos } from './http/http-consultarLotesUsuario.js';

document.addEventListener('DOMContentLoaded', () => {
    var id = sessionStorage.getItem('id-usuario');

    obtenerDatos(id)
        .then(responseArray => {
            
            if (Array.isArray(responseArray) && responseArray.length > 0) {
                const response = responseArray[0];

                if (response && response.lotes && Array.isArray(response.lotes)) {
                    const lotes = response.lotes;
                    const tbody = document.getElementById('data');

                    tbody.innerHTML = '';

                    lotes.forEach(item => {
                        const fila = document.createElement('tr');

                        const columna1 = document.createElement('td');
                        columna1.textContent = item.id; 
                        fila.appendChild(columna1);

                        const columna2 = document.createElement('td');
                        columna2.textContent = item.id_empresa; 
                        fila.appendChild(columna2);

                        const columna3 = document.createElement('td');
                        columna3.textContent = item.estado;
                        fila.appendChild(columna3);

                        const columnaBotones = document.createElement('td');

                        const btnEditar = document.createElement('button');
                        btnEditar.textContent = 'Mostrar Mapa';
                        btnEditar.className = 'btn btn status cancelled';
                        btnEditar.addEventListener('click', function(){
                            // Abre el mapa en una nueva ventana o pestaña
                            window.open('https://www.google.com/maps?q=' + item.latitud + ',' + item.longitud, '_blank');
                        });

                        columnaBotones.appendChild(btnEditar);

                        const btnEliminar = document.createElement('button');
                        btnEliminar.textContent = 'Cancelar Entrega';
                        btnEliminar.className = 'btn btn status cancelled';
                        columnaBotones.appendChild(btnEliminar);

                        fila.appendChild(columnaBotones);

                        tbody.appendChild(fila);
                    });
                } else {
                    console.error('La respuesta de la API no tiene la estructura esperada:', response);
                }
            } else {
                console.error('La respuesta de la API está vacía o no es un array:', responseArray);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
});
