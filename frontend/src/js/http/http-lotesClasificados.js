export async function obtenerLotes() {
     /**Óscar */
    try {
        let token = sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const response = await fetch('http://127.0.0.1:8000/api/lotes/clasificados', options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }
        if (response.status == 202) {
            window.location.href = './redirect.html'
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