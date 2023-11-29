import { obtenerDatos } from "./http/http-consultarUsuarios.js";
import { eliminarUsuario } from "./http/http-eliminarUsuario.js";

function mostrarDatosEnTabla() {
    obtenerDatos()
        .then(response => {
            const data = response.usuarios;
            if (Array.isArray(data)) {
                const tablaBody = document.getElementById('data');
                tablaBody.innerHTML = '';

                data.forEach(item => {
                    const fila = document.createElement('tr');
                    fila.id = `fila-${item.id}`; // Agregar un ID único a cada fila
                    Object.entries(item).forEach(([key, value]) => {
                        if (key !== 'id') {
                            const celda = document.createElement('td');
                            celda.textContent = value;
                            fila.appendChild(celda);
                        }
                    });

                    // Agregar dos botones a la fila
                    const btnModificar = document.createElement('button');
                    btnModificar.textContent = 'Modificar';
                    btnModificar.addEventListener('click', () => {
                        // Lógica para editar el elemento correspondiente
                        console.log('Modificar', item);
                    });

                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.addEventListener('click', () => {
                        // Lógica para eliminar el elemento correspondiente
                        eliminarUsuario(item.id);
                    });

                    const celdaBotones = document.createElement('td');
                    celdaBotones.appendChild(btnModificar);
                    celdaBotones.appendChild(btnEliminar);
                    fila.appendChild(celdaBotones);

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
