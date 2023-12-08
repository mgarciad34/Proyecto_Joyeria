import { obtenerRoles } from "./http/http-ObtenerRoles.js";

document.addEventListener('DOMContentLoaded', function () {
    var rolesDiv = document.getElementById('roles');
    if (rolesDiv) {
        var id = sessionStorage.getItem("id-usuario");

        obtenerRoles(id)
            .then(result => {
                // Comprobamos que es un objeto con una clave numérica
                if (result && typeof result === 'object' && Object.keys(result).length === 1) {
                    // Obtener la primera clave numérica del objeto
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
            })
            .catch(error => {
                console.error('Error al obtener roles:', error);
            });
    } else {
        console.error('No se encontró el div de roles');
    }
});