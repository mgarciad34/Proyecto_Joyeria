export async function obtenerSolicitudes() {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/administrador/peticiones'
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

export async function actualizarPeticion(id,json) {
     
    try {
        
        let token=sessionStorage.getItem('token')
        let url = 'http://127.0.0.1:8000/api/administrador/peticiones/'+id
        const options = {
            method: "PUT",
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: json
           
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