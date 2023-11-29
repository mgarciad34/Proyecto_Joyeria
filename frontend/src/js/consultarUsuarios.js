import { obtenerDatos } from "./http/http-consultarUsuarios.js";

function mostrarDatosEnTabla() {

    obtenerDatos()
    .then(response => {
        const data = response.usuarios;
        if (Array.isArray(data)) {
            const tablaBody = document.getElementById('data');
            tablaBody.innerHTML = '';

            data.forEach(item => {
                const fila = document.createElement('tr');

                Object.values(item).forEach(value => {
                    const celda = document.createElement('td');
                    celda.textContent = value;
                    fila.appendChild(celda);
                });

                tablaBody.appendChild(fila);
            });
        } else {
            console.error('Los datos obtenidos no son un array:', data);
        }
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarDatosEnTabla();
});