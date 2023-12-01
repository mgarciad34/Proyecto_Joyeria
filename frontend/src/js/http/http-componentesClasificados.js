export async function obtenerAllDespiece() {
    try {
    
    const url='http://127.0.0.1:8000/api/despieces'
        let token=sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer"+token,
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch(url,options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}
