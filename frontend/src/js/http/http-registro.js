async function enviarDatos(datos, ruta) {
    try {
        const respuesta = await fetch(ruta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
        // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
    }
}

export { enviarDatos };