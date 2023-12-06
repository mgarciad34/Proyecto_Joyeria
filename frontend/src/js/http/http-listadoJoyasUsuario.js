export async function obtenerJoyas(id) {
    try {
        
        let token=sessionStorage.getItem('token')
        let url='http://127.0.0.1:8000/api/joyas/usuario/'+id
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch(url,options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }
        if(response.status==202){
            window.location.href='./redirect.html'
        }
        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}
export async function eliminarJoya(joya) {
    let token =sessionStorage.getItem('token')
    
    try {
        let url = 'http://127.0.0.1:8000/api/joyas/'+joya
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Error al eliminar la joya');
        }
        if(response.status==202){
            window.location.href='./redirect.html'
        }
        const data = await response.json();

        return data
    } catch (error) {
        return error
    }
}