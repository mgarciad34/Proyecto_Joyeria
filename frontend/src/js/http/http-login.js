async function iniciarSesion(){
    var email = emailEntrada.value
    var contrasena = contraEntrada.value
    var usuario = {
        email: email,
        contrasena: contrasena
    }

    const urlApi = constantes.urlApi
    try{
        const respuesta = await fetch(urlApi + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })

        if (respuesta.ok) {
            const datos = await respuesta.json();
            const token = datos.token;

            localStorage.setItem('token', token);

            window.location.href='../../html/inicio.html'

        } else {
           
        }

    }catch(error){

    }
}