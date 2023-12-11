import {
    crearBoton,
    crearCelda,
    mostrarModal
} from "./http/http-tablaUsuarios.js";
import {
    obtenerDatos
} from "./http/http-consultarUsuarios.js";
import {
    eliminarUsuario
} from "./http/http-eliminarUsuario.js";
import {
    obtenerRoles
} from "./http/http-ObtenerRoles.js";

function mostrarTabla() {
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
                    // Hacemos que la ID no aparezca en la tabla
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

                // Celdas de botones por fila
                const celdaBotones = document.createElement('td');
                celdaBotones.appendChild(btnModificar);
                celdaBotones.appendChild(btnEliminar);
                nuevaFila.appendChild(celdaBotones);

                // Agregamos la fila a la tabla
                tablaBody.appendChild(nuevaFila);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarTabla();

    var rolesDiv = document.getElementById('roles');
    if (rolesDiv) {
        var id = sessionStorage.getItem("id-usuario");

        obtenerRoles(id)
            .then(result => {
                if (result === 202) {
                    return;
                } else if (result === 302) {
                    window.location.href = "indexAdministrador.html";
                } else {
                    if (result && typeof result === 'object' && Object.keys(result).length === 1) {
                        var id_usuario = Object.keys(result)[0];

                        if (Array.isArray(result[id_usuario])) {
                            result[id_usuario].forEach(rol => {
                                const boton = document.createElement('button');
                                boton.className = "btn status cancelled";
                                switch (rol.id_rol) {
                                    case 1:
                                        boton.textContent = "Administrador";
                                        break;
                                    case 2:
                                        boton.textContent = "Clasificador";
                                        break;
                                    case 3:
                                        boton.textContent = "Diseñador";
                                        break;
                                    case 4:
                                        boton.textContent = "Colaborador";
                                        break;
                                    default:
                                        console.error('Rol no reconocido:', rol.id_rol);
                                }

                                boton.addEventListener('click', () => {
                                    switch (rol.id_rol) {
                                        case 1:
                                            window.location.href = './indexAdministrador.html';
                                            break;
                                        case 2:
                                            window.location.href = './indexClasificador.html';
                                            break;
                                        case 3:
                                            window.location.href = './listaJoyas.html';
                                            break;
                                        case 4:
                                            window.location.href = './IndexColaborador.html';
                                            break;
                                        default:
                                            console.error('Redirección no definida para el rol:', rol.id_rol);
                                    }
                                });
                                rolesDiv.appendChild(boton);
                            });
                        } else {
                            console.error('No es un array de roles:', result[id_usuario]);
                        }
                    } else {
                        console.error('No es un objeto', result);
                    }
                }
            })
            .catch(error => {
                console.error('Error al obtener roles:', error);
            });
    } else {
        console.error('No se encontró el div de roles');
    }
});
