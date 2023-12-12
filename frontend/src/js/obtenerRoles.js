import { obtenerRoles } from "./http/http-ObtenerRoles.js";

document.addEventListener('DOMContentLoaded', function () {
    var rolesDiv = document.getElementById('roles');
    if (rolesDiv) {
        var id = sessionStorage.getItem("id-usuario");
        var token = sessionStorage.getItem("token")
        if (token != null) {
            obtenerRoles(id)
                .then(result => {
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
                                }

                                boton.addEventListener('click', () => {
                                    switch (rol.id_rol) {
                                        case 1:
                                            window.location.href = './indexAdministrador.html';
                                            sessionStorage.setItem("ultimo-acceso", "administrador")
                                            break;
                                        case 2:
                                            window.location.href = './indexClasificador.html';
                                            sessionStorage.setItem("ultimo-acceso", "clasificador")
                                            break;
                                        case 3:
                                            window.location.href = './listaJoyas.html';
                                            sessionStorage.setItem("ultimo-acceso", "diseñador")
                                            break;
                                        case 4:
                                            window.location.href = './IndexColaborador.html';
                                            sessionStorage.setItem("ultimo-acceso", "colaborador")
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
        }else{
            window.location.href="../index.html";
        }
    } else {
        console.error('No se encontró el div de roles');
    }
});
