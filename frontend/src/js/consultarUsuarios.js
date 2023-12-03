import { crearBoton, crearCelda, mostrarModal} from "./http/http-tablaUsuarios.js";
import { obtenerDatos } from "./http/http-consultarUsuarios.js";
import { eliminarUsuario } from "./http/http-eliminarUsuario.js";

function mostrarDatosEnTabla() {
    obtenerDatos()
        .then(response => {
            const data = response.usuarios;
            const tablaBody = document.getElementById('data');
            tablaBody.innerHTML = '';
            
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                
                const nuevaFila = document.createElement('tr');
                
                nuevaFila.id = `fila-${item.id}`;

                for (const key in item) {
                    //Hacemos que la ID no aparezca en la tabla
                    if (key !== 'id') {
                        nuevaFila.appendChild(crearCelda(item[key]));
                    }
                }

                const btnModificar = crearBoton('Modificar', 'warning', () => {
                    var btnGuardar = document.getElementById('btnGuardar');
                    var btnCerrar = document.getElementById('btnCerrar');  

                    mostrarModal(item, btnGuardar, btnCerrar);
                });

                const btnEliminar = crearBoton('Eliminar', 'danger', () => {
                    eliminarUsuario(item.id);
                });

                //Celdas de botones por fila
                const celdaBotones = document.createElement('td');
                celdaBotones.appendChild(btnModificar);
                celdaBotones.appendChild(btnEliminar);
                nuevaFila.appendChild(celdaBotones);

                //Agregamos la fila a la tabla
                tablaBody.appendChild(nuevaFila);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarDatosEnTabla();
});