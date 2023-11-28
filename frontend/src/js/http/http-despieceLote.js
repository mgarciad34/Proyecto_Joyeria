export async function obtenerDespiece(id) {
    
    const url='http://127.0.0.1:8000/api/despieces/lote/'+id
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}
