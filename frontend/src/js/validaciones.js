export function validarNombre(nombreValue){
    let nombreRegex=/^[A-Z]{1}[a-z]{1,19}$/
    var result = nombreRegex.test(nombreValue)
    return result
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