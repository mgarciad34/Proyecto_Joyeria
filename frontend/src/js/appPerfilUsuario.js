import { validarCorreo,validarContrasena } from "./validaciones.js"
import { actualizarEmail,actualizarPassword,cerrarSesion } from "./http/http-perfilUsuario.js"
// const bcrypt = require('bcrypt');

let fotoUrl=sessionStorage.getItem('foto-url')
document.getElementById('btnFoto').style.background='url('+fotoUrl+') center / cover'
let lblFoto=document.getElementById('lblFoto')
lblFoto.style.background='url('+fotoUrl+') center / cover'

let inputFoto=document.getElementById('inputFoto')
let formularioFoto=document.getElementById('formularioFoto')

document.getElementById('txtNombre').textContent=sessionStorage.getItem('username')

let btnFoto=document.getElementById('btnFoto')
let btnEmail=document.getElementById('btnEmail')
let btnPassword=document.getElementById('btnPassword')
let btnOut=document.getElementById('btnOut')
let usuario=JSON.parse(sessionStorage.getItem('id-usuario'))

inputFoto.addEventListener('change',function(event){
    var input = event.target;
            
    if (input.files && input.files[0]) {
        var fotoUrl2 = URL.createObjectURL(input.files[0]);
        console.log('URL local de la foto:', fotoUrl2);
    }
   document.getElementById('lblFoto').style.background='url('+fotoUrl2+') center / cover'
    sessionStorage.setItem('nueva-foto',JSON.stringify(fotoUrl2))
    document.getElementById('confirmarGuardado').style.display=''
})

btnEmail.addEventListener('click',function(){
    lanzarModalEmail()
})

btnPassword.addEventListener('click',function(){
    lanzarModalPassword()
})
btnOut.addEventListener('click',function(){
    lanzarModalOut()
})


btnFoto.addEventListener('click',function(){

lanzarModalGuardado()


})
function lanzarModalGuardado() {
    document.getElementById('modal-foto').style.display = 'flex';

    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal-foto').style.display = 'none';
        lblFoto.style.background='url('+fotoUrl+') center / cover'
    });

    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        let lblFoto = document.getElementById('lblFoto');
        let lbl2 = document.createElement('label');
        lbl2.setAttribute('for', 'inputFoto');
        lbl2.setAttribute('id', 'lblFoto');

        lbl2.classList.remove('spinner2');
        lbl2.classList.add('spinner2');
        
        document.getElementById('cancelarGuardado').style.display = 'none';
        
        lbl2.style.background='url('+sessionStorage.getItem('nueva-foto')+') center / cover'
        lbl2.id=lblFoto.id
        lblFoto.replaceWith(lbl2);
        document.getElementById('inputFoto').disabled=true
        document.getElementById('confirmarGuardado').style.display = 'none';


        setTimeout(() => {
            this.textContent = 'Continuar';
            this.style.display = ''; 
            this.addEventListener('click', function () {
                document.getElementById('modal-foto').style.display = 'none';
              window.location.reload(true)
            });
        }, 2000);
        
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
        let confirmar=document.getElementById('confirmarEmail')
        let cancelar=document.getElementById('cancelarEmail')
        let alerta=document.getElementById('alertaEmail')
        document.getElementById('modal-email').style.display = 'flex';
    
        cancelar.addEventListener('click', function () {
            document.getElementById('modal-email').style.display = 'none';
        });
    
        confirmar.addEventListener('click', function () {
            let input1=document.getElementById('inputEmail').value
            let input2=document.getElementById('inputEmail2').value

            if(input1!=input2){
                alerta.textContent='La direccion de correo electronico no coincide'
            }else{
              if(!validarCorreo(input1)){
                alerta.textContent='Formato de email incorrecto'
              }else{
                let json={}
                json['email']=input1
           
                actualizarEmail(usuario,json).then(function(data){
                   
                   alerta.textContent=data.mensaje
                   confirmar.textContent='Continuar'
                   cancelar.style.display='none'
                   alerta.style.color='green'
                   confirmar.addEventListener('click', function(){
                        input1.value=''
                        input2.value=''
                        window.location.reload(true)
                    })
                })
              }
            }
            
        });
    }

    function lanzarModalPassword() {
        let confirmar=document.getElementById('confirmarPassword')
        let cancelar=document.getElementById('cancelarPassword')
        let alerta=document.getElementById('alertaPassword')
        document.getElementById('modal-password').style.display = 'flex';
    
        cancelar.addEventListener('click', function () {
            document.getElementById('modal-password').style.display = 'none';
        });
    
        confirmar.addEventListener('click', function () {
            let input1=document.getElementById('inputPassword1').value
            let input2=document.getElementById('inputPassword2').value

            if(input1!=input2){
                alerta.textContent='Las contraseñas no coinciden'
            }else{
              if(!validarContrasena(input1)){
                alerta.textContent='Formato de contraseña incorrecto'
              }else{
                let json={}
                json['password']=input1
                console.log(json)
                actualizarPassword(usuario,json).then(function(data){
                   
                   alerta.textContent=data.mensaje
                   confirmar.textContent='Continuar'
                   cancelar.style.display='none'
                   alerta.style.color='green'
                   confirmar.addEventListener('click', function(){
                    document.getElementById('inputPassword1').value=''
                    document.getElementById('inputPassword2').value=''
                        window.location.reload(true)
                    })
                })
              }
            }
      
        });
    }

    function lanzarModalOut() {
        let confirmar=document.getElementById('confirmarOut')
        let cancelar=document.getElementById('cancelarOut')
        let alerta=document.getElementById('alertaOut')
        document.getElementById('modal-out').style.display = 'flex';
    
        cancelar.addEventListener('click', function () {
            document.getElementById('modal-out').style.display = 'none';
        });
    
        confirmar.addEventListener('click', function () {
       
                alerta.textContent='Cerrando sesion...'
                sessionStorage.clear()
                cerrarSesion(usuario).then(function(){
                    window.location.href='../index.html'
                })
      
        });
    }