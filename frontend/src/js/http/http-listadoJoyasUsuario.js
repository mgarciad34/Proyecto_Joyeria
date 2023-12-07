export async function obtenerJoyas(id) {
    try {

        let token = sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/joyas/usuario/' + id
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
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
export async function eliminarJoya(joya) {
    let token = sessionStorage.getItem('token')

    try {
        let url = 'http://127.0.0.1:8000/api/joyas/' + joya
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Error al eliminar la joya');
        }

        const data = await response.json();
        return data
    } catch (error) {
        return error
    }
}