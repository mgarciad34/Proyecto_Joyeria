//Manuel
import { obtenerDatos } from "./http/http-consultarComponentes.js";
import { eliminarComponente } from "./http/http-eliminarComponente.js";
import { crearCelda, crearBoton, mostrarModal } from "./http/http-tablaComponente.js";


let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('fotoNav').src = fotoUrl
sessionStorage.setItem('ultimo-acceso', JSON.stringify('administrador'))

function mostrarTabla() {
    var token = sessionStorage.getItem("token")
    if (token != null) {

        obtenerDatos()
            .then(response => {
                const data = response.tipos;
                const tablaBody = document.getElementById('data');
                tablaBody.innerHTML = '';

                for (let i = 0; i < data.length; i++) {
                    const item = data[i];

                    const nuevaFila = document.createElement('tr');

                    nuevaFila.id = `fila-${item.id}`;

                    for (const key in item) {
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
                        eliminarComponente(item.id);
                    });

                    const celdaBotones = document.createElement('td');
                    celdaBotones.appendChild(btnModificar);
                    celdaBotones.appendChild(btnEliminar);
                    nuevaFila.appendChild(celdaBotones);

                    tablaBody.appendChild(nuevaFila);
                }
            })
            .catch(error => {
                window.location.href='redirect.html';
            });
    }else{
        window.location.href='redirect.html';
    }

}

document.addEventListener('DOMContentLoaded', function () {
    mostrarTabla();
});