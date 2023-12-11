export async function obtenerTipos() {
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
        const apiUrl2 = 'http://127.0.0.1:8000/api/despieces/tipos'
        const response = await fetch(apiUrl2, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener los tipos');
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

export async function registrarComponente(componente) {
    try {
        let token = sessionStorage.getItem('token')
        const options = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(componente)

        }
        const apiUrl2 = 'http://127.0.0.1:8000/api/despieces/tipos'
        const response = await fetch(apiUrl2, options);
        if (!response.ok) {
            throw new Error('No se pudo guardar el componente');
        }
        const data = await response.json();

        return data
    } catch (error) {
        return error
    }

}