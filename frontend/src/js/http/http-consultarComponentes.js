export function obtenerDatos() {
    let url = 'http://127.0.0.1:8000/api/administrador/consultar/componentes';
    
    return fetch(url)
        .then(response => response.json())
        .then(data => { return data;})
        .catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
}
