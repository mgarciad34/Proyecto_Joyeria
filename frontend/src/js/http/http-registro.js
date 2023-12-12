//Manuel
export async function enviarDatos(datos, ruta) {
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
    }
}

export function obtenerNombreColor(rgbColor) {
    var colores = {
        'rgb(255, 0, 0)': 'red',
        'rgb(0, 128, 0)': 'green'
    };
    return colores[rgbColor];
}

export function comprobarColor(etiquetap){

    var estilos = window.getComputedStyle(etiquetap);
    var colorTextoRGB = estilos.color;
    var colorTextoNombre = obtenerNombreColor(colorTextoRGB);
   
    if(colorTextoNombre === "green"){
        return 1;
    }else{
        return 0;
    }

}
