//Manuel
export async function obtenerLotes() {
    try {
        let token=sessionStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
            
        }
        const response = await fetch('http://127.0.0.1:8000/api/lotes/entregados',options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}
