export async function obtenerRecetas(id) {
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
        const response = await fetch('http://127.0.0.1:8000/api/recetas/' + id, options);
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

export async function fabricarJoya(joya, id_usuario) {
    try {
        let json = {}
        json['id_usuario'] = id_usuario
        let token = sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/joyas/fabricar/' + joya
     
        const options = {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('No se pudo fabricar la joya');
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

export async function isOwner(joya, id_usuario) {
    let token = sessionStorage.getItem('token')
    try {
        let url = 'http://127.0.0.1:8000/api/joyas/owner/' + joya + '/' + id_usuario
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },

        }
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('No se pudo obtener el valor');
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
            throw new Error('No se pudo obtener las categorias');
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