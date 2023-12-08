//Manuel
export function obtenerDatos(id) {
    let url = `http://127.0.0.1:8000/api/lotes/entregados/${id}/`;
    var token = sessionStorage.getItem('token');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
}
