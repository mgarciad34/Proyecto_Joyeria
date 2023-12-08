// http-consultarLotesUsuario.js

import { obtenerDatos } from './http/http-consultarLotesUsuario.js';

document.addEventListener('DOMContentLoaded', () => {
    var id = sessionStorage.getItem('id-usuario');

    obtenerDatos(id)
        .then(responseArray => {
            // Verifica si la respuestaArray tiene al menos un elemento
            if (Array.isArray(responseArray) && responseArray.length > 0) {
                const response = responseArray[0];

                if (response && response.lotes && Array.isArray(response.lotes)) {
                    const lotes = response.lotes;
                    const tbody = document.getElementById('data');

                    tbody.innerHTML = '';

                    lotes.forEach(item => {
                        const fila = document.createElement('tr');

                        const columna1 = document.createElement('td');
                        columna1.textContent = item.id; // Ajusta según la propiedad real en tu objeto
                        fila.appendChild(columna1);

                        const columna2 = document.createElement('td');
                        columna2.textContent = item.id_empresa; // Ajusta según la propiedad real en tu objeto
                        fila.appendChild(columna2);

                        const columna3 = document.createElement('td');
                        columna3.textContent = item.estado;
                        fila.appendChild(columna3);

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
