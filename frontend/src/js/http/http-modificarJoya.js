export async function obtenerTipos() {
    try {
        let token = sessionStorage.getItem('token')
        const apiUrl2 = 'http://127.0.0.1:8000/api/joyas/tipos'
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },

        }
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
export async function obtenerJoya(id) {
    try {
        let token = sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const apiUrl2 = 'http://127.0.0.1:8000/api/joyas/' + id
        const response = await fetch(apiUrl2, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener la joya');
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
export async function obtenerRecetas(id) {
    try {
        let token = sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

        }
        const response = await fetch('http://127.0.0.1:8000/api/recetas/' + id, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }
        if (response.status == 202) {
            window.location.href = './redirect.html'
        }
        const data = await response.json();

        return data

    } catch (error) {
        return false
    }
}

export async function actualizarJoya(id, joyas) {

    try {
        let token = sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/joyas/' + id
        const options = {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(joyas)
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo actualizar');
        }
        if (response.status == 202) {
            window.location.href = './redirect.html'
        }
        const data = await response.json();

        return data
    } catch (error) {
        return error
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
        if (response.status == 202) {
            window.location.href = './redirect.html'
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}