//Óscar
export async function obtenerTipos() {
    try {
        let token = sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const apiUrl2 = 'http://127.0.0.1:8000/api/joyas/tipos'
        const response = await fetch(apiUrl2, options);
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

export async function guardarNuevaJoya(joya) {

    try {
        let token = sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/joyas/nueva'
        const options = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(joya)
        }
        const response = await fetch(url, options);
        if (!response.ok) {

            throw new Error('No se pudo guardar la joya');
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
export async function subirFoto(formulario, id) {
    try {
        let fData = new FormData(formulario);
        let token = sessionStorage.getItem('token');
        let url = 'http://127.0.0.1:8000/api/joyas/foto/' + id;
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: fData,
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo subir la foto');
        }


        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export async function generarNuevaReceta() {
    try {
        let token = sessionStorage.getItem('token');
        let url = 'http://127.0.0.1:8000/api/joyas/receta/generador';
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
           
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo generar la receta');
        }


        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}