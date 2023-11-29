import { obtenerDatos } from "./http/http-consultarComponentes.js";
import { eliminarUsuario } from "./http/http-eliminarUsuario.js";

function mostrarDatosEnTabla() {
    obtenerDatos()
        .then(response => {
            const data = response.tipos;
            
            console.log(data)
            if (Array.isArray(data)) {
                const tablaBody = document.getElementById('data');
                tablaBody.innerHTML = '';

                data.forEach(item => {
                    const fila = document.createElement('tr');
                    fila.id = `fila-${item.id}`; // Interpolacion de cadenas
                    Object.entries(item).forEach(([key, value]) => {
                        //Quitamos la fila id de la tabla
                        if (key !== 'id') {
                            const celda = document.createElement('td');
                            celda.textContent = value;
                            fila.appendChild(celda);
                        }
                    });

                    //Botones
                    const btnModificar = document.createElement('button');
                    btnModificar.textContent = 'Modificar';
                    btnModificar.style.background = 'Yellow';
                    btnModificar.addEventListener('click', () => {
                        console.log('Modificar', item);
                    });

                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.style.background = 'Red';
                    btnEliminar.addEventListener('click', () => {
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
