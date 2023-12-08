//Manuel
export function eliminarUsuario(id) {
    eliminarDatos(id)
        .then(() => {
            const tablaBody = document.getElementById('data');
            const filaEliminar = document.getElementById(`fila-${id}`);
            if (filaEliminar) {
                tablaBody.removeChild(filaEliminar);
            }
        })
        .catch(error => {
            console.error('Error al eliminar usuario de la API:', error);
        });
}

export async function cancelarLote(id) {
    try {
         const token = sessionStorage.getItem('token')

        const response = await fetch(`http://127.0.0.1:8000/api/lotes/eliminar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        } else {
            return response.json();
        }
    } catch (error) {
        console.error('Error en la función eliminarDatos', error);
    }
}
