export async function obtenerTipos() {
    try {
        const apiUrl2 = 'http://127.0.0.1:8000/api/consultar/tipos'
        const response = await fetch(apiUrl2);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }

}
export async function obtenerJoya(id) {
    try {
        const apiUrl2 = 'http://127.0.0.1:8000/api/joyas/'+id
        const response = await fetch(apiUrl2);
        if (!response.ok) {
            throw new Error('No se pudo obtener la joya');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }
}
    export async function obtenerRecetas(id) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recetas/'+id);
            if (!response.ok) {
                throw new Error('No se pudo obtener las joyas');
            }
    
            const data = await response.json();
            
            return data
    
        } catch (error) {
            return false
        }
    }