export async function obtenerJoyas(id) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/joyas/usuario/'+id);
        if (!response.ok) {
            throw new Error('No se pudo obtener las joyas');
        }

        const data = await response.json();
        
        return data

    } catch (error) {
        return false
    }
}
export async function eliminarJoya(joya) {

    try {
        let url = 'http://127.0.0.1:8000/api/joya/eliminar/'+joya
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'aplication/json'
            },
            
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorias');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }
}