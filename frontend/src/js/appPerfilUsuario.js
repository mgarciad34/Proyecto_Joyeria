let btnFoto=document.getElementById('btnFoto')










btnFoto.addEventListener('click',function(){

lanzarModalGuardado()


})
function lanzarModalGuardado() {
    document.getElementById('modal-foto').style.display = 'flex';

    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal-foto').style.display = 'none';
    });

    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        let lblFoto = document.getElementById('lblFoto');
        let lbl2 = document.createElement('label');
        lbl2.setAttribute('for', 'inputFoto');
        lbl2.setAttribute('id', 'lblFoto');

        lblFoto.replaceWith(lbl2);
        lbl2.classList.remove('spinner2');
        lbl2.classList.add('spinner2');
       
        document.getElementById('cancelarGuardado').style.display = 'none';

        // Almacena una referencia a 'this' para usarlo dentro de setTimeout
        let self = this;
        lblFoto.style.background='url(https://jawa-oscar.s3.eu-west-3.amazonaws.com/perfiles/50) center / cover'
        this.style.display = 'none';
        setTimeout(() => {
            this.textContent = 'Continuar';
            this.style.display = ''; // Muestra el botón después de 5 segundos
            this.addEventListener('click', function () {
                document.getElementById('modal-foto').style.display = 'none';
            });
        }, 2000);
        this.style.display = '';
    });
}

    function lanzarModalErrores(mensaje){
        document.getElementById('modal-errores').style.display = 'flex';
        document.getElementById('mensajeErrores').textContent=mensaje
        document.getElementById('cerrarModalErrores').addEventListener('click',function(){
            document.getElementById('modal-errores').style.display = 'none';
        })
    }