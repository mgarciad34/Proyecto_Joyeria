export async function obtenerLotes() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/consultarLotes/clasificados');
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();
        console.log('hola')
        return data

    } catch (error) {
        return false
    }
}
