export function eliminarUsuario(id) {
    const tablaBody = document.getElementById('data');
    const filaEliminar = document.getElementById(`fila-${id}`);
    if (filaEliminar) {
        tablaBody.removeChild(filaEliminar);
    }
}