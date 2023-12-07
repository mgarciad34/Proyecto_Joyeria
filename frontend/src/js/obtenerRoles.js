import { obtenerRoles} from "./http/http-ObtenerRoles.js";

document.addEventListener('DOMContentLoaded', function() {
    var rolesDiv = document.getElementById('roles');
    if (rolesDiv) {
        var rolesAsignados = {};
        var id = sessionStorage.getItem("id-usuario");
       obtenerRoles(id)
        .then(result => {
            rolesAsignados[id] = result;
            console.log(rolesAsignados)
            
        })
        .catch(error => {
            console.error('Error al obtener roles:', error);
        });
    } else {
        console.error('No se encontró el div de roles');
    }
});