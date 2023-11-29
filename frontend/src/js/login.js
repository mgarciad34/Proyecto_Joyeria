import { obtenerDatos } from "./http/http-login.js";
const correo = 'manueldiarciaz@gmail.com';
const contrasena = '1234567';
const messge = document.getElementById('txtmensaje')
obtenerDatos(correo, contrasena)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    var message = 'Usuario o contraseña incorrectos';
    
  });
