//Manuel
export async function enviarDatos(datos, ruta) {
    try {
        const token = sessionStorage.getItem('token')
        const respuesta = await fetch(ruta, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'aplication/json'
            },

            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            return 400;
        }else{
            return 201;
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
    }
}
