//Manuel
export async function enviarDatos(datos, ruta) {
    try {
        const token = sessionStorage.getItem('token')

        const respuesta = await fetch(ruta, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            return 400;
        }else{
            return 200;
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}