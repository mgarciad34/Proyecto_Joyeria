//Manuel
//Archivo para el tema claro/oscuro del html

function cambiarColorFondo() {
    var body = document.getElementById('body');
    var contenido = document.getElementById('contenido');
    body.classList.toggle('bg-dark');
    contenido.classList.toggle('bg-dark');
}

document.addEventListener('DOMContentLoaded', function() {
    var switchFondo = document.getElementById('switchFondo');
    switchFondo.addEventListener('change', cambiarColorFondo);
});