export async function obtenerHistorial() {
    try {
        let token=sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch('http://127.0.0.1:8000/api/joyas/historial',options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}