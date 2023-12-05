//Manuel
export function eliminarComponente(id) {
    eliminarDatosComponente(id)
        .then(() => {
            const tablaBody = document.getElementById('data');
            const filaEliminar = document.getElementById(`fila-${id}`);
            if (filaEliminar) {
                tablaBody.removeChild(filaEliminar);
            }
        })
        .catch(error => {
            console.error('Error al eliminar componente de la API:', error);
        });
}

export async function eliminarDatosComponente(id) {
    try {
        const token = sessionStorage.getItem('token')

        const response = await fetch(`http://127.0.0.1:8000/api/administrador/eliminar/componente/${id}`, {
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
