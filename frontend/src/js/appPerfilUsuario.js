import { validarCorreo } from "./validaciones.js"
let btnFoto=document.getElementById('btnFoto')
let btnEmail=document.getElementById('btnEmail')
let btnPassword=document.getElementById('btnPassword')
let usuario=JSON.parse(sessionStorage.getItem('id-usuario'))

btnEmail.addEventListener('click',function(){
    lanzarModalEmail()
})




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

        lblFoto.style.background='url(https://jawa-oscar.s3.eu-west-3.amazonaws.com/perfiles/50) center / cover'
        this.style.display = 'none';
        setTimeout(() => {
            this.textContent = 'Continuar';
            this.style.display = ''; 
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

    function lanzarModalEmail() {
        document.getElementById('modal-email').style.display = 'flex';
    
        document.getElementById('cancelarEmail').addEventListener('click', function () {
            document.getElementById('modal-email').style.display = 'none';
        });
    
        document.getElementById('confirmarEmail').addEventListener('click', function () {
            let input1=document.getElementById('inputEmail').value
            let input2=document.getElementById('inputEmail2').value

            if(input1!=input2){
                document.getElementById('alertaEmail').textContent='La direccion de correo electronico no coincide'
            }else{
              if(!validarCorreo(input1)){
                document.getElementById('alertaEmail').textContent='Formato de email incorrecto'
              }else{
                // actualizarEmail().then(function(data){
                //     if()
                // })
              }
            }
            // guardarNuevoEmail(inputEmail.value)
            // this.style.display = '';
        });
    }