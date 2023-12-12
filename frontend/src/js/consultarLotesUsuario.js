//Manuel
import { cancelarLote } from './http/http-cancelarLote.js';
import { obtenerDatos } from './http/http-consultarLotesUsuario.js';
let fotoUrl = sessionStorage.getItem('foto-url')

document.addEventListener('DOMContentLoaded', () => {
    var id = sessionStorage.getItem('id-usuario');
    let fotoUrl = sessionStorage.getItem('foto-url')
    document.getElementById('fotoNav').src = fotoUrl
    sessionStorage.setItem('ultimo-acceso', JSON.stringify('colaborador'))
    obtenerDatos(id)
        .then(responseArray => {
            if (sessionStorage.getItem("token") != null) {
                if (Array.isArray(responseArray) && responseArray.length > 0) {
                    const response = responseArray[0];

                    if (response && response.lotes && Array.isArray(response.lotes)) {
                        const lotes = response.lotes;
                        const tbody = document.getElementById('data');

                        tbody.innerHTML = '';

                        lotes.forEach(item => {
                            const fila = document.createElement('tr');

                            const columnas = ['id', 'id_empresa', 'estado'];
                            columnas.forEach(columna => {
                                const nuevaColumna = document.createElement('td');
                                nuevaColumna.textContent = item[columna];
                                fila.appendChild(nuevaColumna);
                            });

                            const columnaBotones = document.createElement('td');

                            const crearBoton = (texto, className, clickHandler) => {
                                const boton = document.createElement('button');
                                boton.textContent = texto;
                                boton.className = `btn btn status ${className}`;
                                boton.addEventListener('click', clickHandler);
                                return boton;
                            };

                            const btnEditar = crearBoton('Mostrar Mapa', 'cancelled', function () {
                                window.open(`https://www.google.com/maps?q=${item.latitud},${item.longitud}`, '_blank');
                            });

                            const btnEliminar = crearBoton('Cancelar Entrega', 'cancelled', function () {
                                cancelarLote(item.id);
                                window.location.href = 'IndexColaborador.html';
                            });

                            columnaBotones.appendChild(btnEditar);
                            columnaBotones.appendChild(btnEliminar);

                            fila.appendChild(columnaBotones);

                            tbody.appendChild(fila);
                        });
                    } else {
                        console.error('La respuesta de la API no tiene la estructura esperada:', response);
                    }
                } else {
                    window.location.href='redirect.html';
                }
            }
        })
        .catch(error => {
            window.location.href='redirect.html';
        });
});
