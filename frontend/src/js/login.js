import { obtenerDatos, enviarSessionStorage } from "./http/http-login.js";

//Variables a utilizar
const correo = document.getElementById('txtcorreo');
const contrasena = document.getElementById('txtcontrasena');
var btnlogin = document.getElementById('loguearse');
const message = document.getElementById('txtmensaje')

//Eventos
btnlogin.addEventListener('click', function(event){
  event.preventDefault();

  obtenerDatos(correo.value, contrasena.value)
      .then(data => {
          message.textContent = '';
          var token = data.data.token;
          var id = data.data.id;
          sessionStorage.setItem('foto-url',data.data.foto)
          sessionStorage.setItem('username',data.data.nombre)
          enviarSessionStorage(id, token)
          window.location.href='views/redirect.html';
      })
      .catch(error => {
          var mensaje = 'Usuario o contraseña incorrectos';
          message.textContent = mensaje;
          message.style.color = 'red';
      });
});

