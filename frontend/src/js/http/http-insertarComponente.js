//Manuel
export async function enviarDatos(datos, ruta) {
    try {
        const token = sessionStorage.getItem('token')
        const respuesta = await fetch(ruta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}