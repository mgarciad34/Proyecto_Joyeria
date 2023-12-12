//Manuel
export function obtenerRoles(id) {
    let url = `http://127.0.0.1:8000/api/roles/${id}`;
    let resultado = {};

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultado = data;
            return resultado;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
}
