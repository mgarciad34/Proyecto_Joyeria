export async function obtenerHistorial() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/joyas/historial');
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}