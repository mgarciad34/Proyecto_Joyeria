//Óscar
export async function obtenerDespiece(id) {
    
    try {
        let token = sessionStorage.getItem('token')
        const url = 'http://127.0.0.1:8000/api/despieces/lote/' + id
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }
        if (response.status == 202) {
            return 202

        }
        const data = await response.json();
        if (response.ok) {

            return data
        }
    } catch (error) {
        return 302
    }
}