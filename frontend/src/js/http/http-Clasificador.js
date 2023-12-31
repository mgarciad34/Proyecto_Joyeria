//Óscar
export async function obtenerLotes() {
    try {

        let token = sessionStorage.getItem('token')

        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },

        }
        const response = await fetch('http://127.0.0.1:8000/api/lotes/entregados', options);
        if (!response.ok) {
            throw new Error('No se pudo obtener los lotes');
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