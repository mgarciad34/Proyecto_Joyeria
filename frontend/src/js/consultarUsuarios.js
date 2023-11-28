import { obtenerDatos } from "./http/http-consultarUsuarios.js";

function mostrarDatos(){
    obtenerDatos()
    .then(data => {

    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

function mostrarDatos() {
    obtenerDatos()
        .then(data => {
            const tablaBody = document.querySelector('.data');

            // Limpiar el contenido actual de la tabla
            tablaBody.innerHTML = '';

            // Iterar sobre los datos y crear filas
            data.forEach(item => {
                const fila = document.createElement('tr');

                // Iterar sobre las propiedades del objeto y crear celdas
                Object.values(item).forEach(value => {
                    const celda = document.createElement('td');
                    celda.textContent = value;
                    fila.appendChild(celda);
                });

                // Agregar la fila al cuerpo de la tabla
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

// Llamar a la función para mostrar la tabla
mostrarDatosEnTabla();

mostrarDatos()