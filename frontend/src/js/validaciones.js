export function validarNombre(nombreValue) {
    const nombreRegex = /^[a-z]{1,20}$/;
    if (nombreRegex.test(nombreValue)) {
        const nombreCorregido = nombreValue.charAt(0).toUpperCase() + nombreValue.slice(1);
        return nombreCorregido;
    } else {
        return false;
    }
}


export function validarCorreo(emailValue) {
    const emailRegex = /^[A-Za-zñÑ0-9_]{2,15}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    var result = emailRegex.test(emailValue)
    return result;
}

export function validarContrasena(contrasena){
    let contrasenaRegex = /^[A-Za-z0-9*#$.]{6,12}$/;
    var result = contrasenaRegex.test(contrasena)
    return result
}

// Comprobar si las dos contraseñas son iguales
export function confirmarContrasena (contUno, contDos){
    var result = false
    if (contUno === contDos){
        result = true
    }
    return result
}