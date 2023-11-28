export async function obtenerDespiece(id) {
    console.log('llega')
    const url='http://127.0.0.1:8000/api/lote/despiece/'+id
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
