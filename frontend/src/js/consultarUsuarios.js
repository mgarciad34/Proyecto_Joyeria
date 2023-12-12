import { crearBoton, crearCelda, mostrarModal } from "./http/http-tablaUsuarios.js";
import { obtenerDatos } from "./http/http-consultarUsuarios.js";
import { eliminarUsuario } from "./http/http-eliminarUsuario.js";
import { obtenerRoles } from "./http/http-ObtenerRoles.js";

let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('administrador'))
function mostrarDatosEnTabla() {
    var token = sessionStorage.getItem("token")
    if (token != null) {

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
                        if (key === 'foto') {
                            const celdaImagen = document.createElement('td');
                            const imagen = document.createElement('img');
                            imagen.src = item[key]; 
                            imagen.alt = 'Imagen de usuario';
                            imagen.style.width = '50px'; 
                            celdaImagen.appendChild(imagen);
                            nuevaFila.appendChild(celdaImagen);
                        } else if (key !== 'id') {
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

                    const celdaBotones = document.createElement('td');
                    celdaBotones.appendChild(btnModificar);
                    celdaBotones.appendChild(btnEliminar);
                    nuevaFila.appendChild(celdaBotones);

                    tablaBody.appendChild(nuevaFila);
                }
            })
            .catch(error => {
                window.location.href = 'redirect.html';
            });
    } else {
        window.location.href = 'redirect.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var id = sessionStorage.getItem("id-usuario");

    obtenerRoles(id)
        .then(result => {
            if (result === 202) {
                window.location.href = 'redirect.html';
            } else if (result === 302) {
                window.location.href = "../index.html";
            } else {
                mostrarDatosEnTabla();
            }
        })
        .catch(error => {
            console.error('Error al obtener roles:', error);
        });
});
