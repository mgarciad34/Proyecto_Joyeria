export async function obtenerLotes() {
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer"+token,
                'Content-Type': 'aplication/json'
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
