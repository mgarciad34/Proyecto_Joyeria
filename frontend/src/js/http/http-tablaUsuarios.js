export function crearCelda(valor) {
    const celda = document.createElement('td');
    celda.textContent = valor;
    return celda;
}

export function crearBoton(texto, color, clickHandler) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.classList.add('btn', `btn-${color}`);
    boton.addEventListener('click', clickHandler);
    
    return boton;
}


export function mostrarModal(usuarios, modificar, cerrar, nombre) {
    console.log(usuarios)
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const myInputNombre = document.getElementById('txtnombre');
    const myInputEmail = document.getElementById('txtemail');
    // Otros campos según sea necesario

    // Llenar los campos del formulario con los datos del usuario
    myInputNombre.value = usuarios.name;
    myInputEmail.value = usuarios.email;
    // Otros campos según sea necesario
    

    myModal.show();

    myModal._element.addEventListener('shown.bs.modal', () => {
        myInput.focus();


    });
    
    modificar.addEventListener("click", function () {
        console.log('Guardar')
    });

    cerrar.addEventListener("click", function () {
        myModal.hide();
    });
}



