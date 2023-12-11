
export async function actualizarEmail(id,json) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/usuarios/email/'+id
        const options = {
            method: "PUT",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
    
            throw new Error('No se pudo actualizar');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }
}


export async function actualizarPassword(id,json) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/usuarios/password/'+id
        const options = {
            method: "PUT",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo actualizar');
        }
        const data = await response.json();
        return data
    } catch (error) {
        return error
    }
}

export async function cerrarSesion(id) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/logout/'+id
        const options = {
            method: "POST",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo cerrar sesión');
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
        let url = 'http://127.0.0.1:8000/api/usuarios/foto/'+ id;
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
        sessionStorage.setItem('foto-url',(data.url))
        return data;
    } catch (error) {
        return error;
    }
}


export async function obtenerRolesAsignados(id) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/usuarios/roles/'+id
        const options = {
            method: "GET",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener los roles');
        }
        const data = await response.json();
        return data
    } catch (error) {
        return error
    }
}

export async function enviarSolicitud(id,solicitud) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/usuarios/'+id+'/peticion'
        const options = {
            method: "POST",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: solicitud,
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo cerrar sesión');
        }
        const data = await response.json();
        return data
    } catch (error) {
        return error
    }
}


export async function obtenerSolicitudes(id) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/usuarios/'+id+'/peticion'
        const options = {
            method: "GET",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
           
        }
 
        const response = await fetch(url, options);
        if (!response.ok) {
    
            throw new Error('No se pudo actualizar');
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