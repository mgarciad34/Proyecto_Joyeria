import {
    validarCorreo,
    validarContrasena
} from "./validaciones.js"
import {
    actualizarEmail,
    actualizarPassword,
    cerrarSesion,
    subirFoto,
    obtenerRolesAsignados,
    enviarSolicitud,
    obtenerSolicitudes,
} from "./http/http-perfilUsuario.js"
 /**Óscar */
let fotoUrl = sessionStorage.getItem('foto-url')
document.getElementById('btnFoto').style.background = 'url(' + fotoUrl + ') center / cover'
let lblFoto = document.getElementById('lblFoto')
lblFoto.style.background = 'url(' + fotoUrl + ') center / cover'

let inputFoto = document.getElementById('inputFoto')
let formularioFoto = document.getElementById('formularioFoto')

document.getElementById('txtNombre').textContent = sessionStorage.getItem('username')

let btnFoto = document.getElementById('btnFoto')
let btnEmail = document.getElementById('btnEmail')
let btnPassword = document.getElementById('btnPassword')
let btnOut = document.getElementById('btnOut')
let usuario = JSON.parse(sessionStorage.getItem('id-usuario'))
let btnPeticion = document.getElementById('btnPeticion')
let cabecera = document.getElementById('cabecera');
obtenerSolicitudes(usuario).then(function (data) {
    if (data == 202 || data == 302) {
        if (data == 202) {
            window.location.href = './redirect.html'
        } else {
            window.location.href = '../index.html'
        }
    } else {

        pintarPeticiones(data[0].peticiones)
    }
})

insertarCabecera()


inputFoto.addEventListener('change', function (event) {
    var input = event.target;
    document.getElementById('lblFoto').classList.remove('fotoModal')

    if (input.files && input.files[0]) {
        var fotoUrl2 = URL.createObjectURL(input.files[0]);

    }
    document.getElementById('lblFoto').style.background = 'url(' + fotoUrl2 + ') center / cover'
    sessionStorage.setItem('nueva-foto', JSON.stringify(fotoUrl2))
    document.getElementById('confirmarGuardado').style.display = ''
    document.getElementById('alertaFoto').textContent = '¿Estas seguro que deseas guardar esta foto?'
    document.getElementById('lblFoto').classList.add('fotoModal2')
})

btnEmail.addEventListener('click', function () {
    lanzarModalEmail()
})

btnPassword.addEventListener('click', function () {
    lanzarModalPassword()
})
btnOut.addEventListener('click', function () {
    lanzarModalOut()
})


btnFoto.addEventListener('click', function () {

    lanzarModalGuardado()


})
document.getElementById('formularioFoto').addEventListener('click submit change', function (event) {
    event.preventDefault()
})
btnPeticion.addEventListener('click', function () {
    lanzarModalPeticion()
})

function lanzarModalGuardado() {
    document.getElementById('modal-foto').style.display = 'flex';

    document.getElementById('cancelarGuardado').addEventListener('click', function () {
        document.getElementById('modal-foto').style.display = 'none';
        lblFoto.style.background = 'url(' + fotoUrl + ') center / cover'
        document.getElementById('alertaFoto').textContent = 'Selecciona una nueva foto'
    });
    lblFoto.classList.remove('fotoModal')
    lblFoto.classList.add('fotoModal')

    document.getElementById('confirmarGuardado').addEventListener('click', function () {
        let formData = document.getElementById('formularioFoto')
        subirFoto(formData, usuario).then(function (data) {
            let lblFoto = document.getElementById('lblFoto');
            let lbl2 = document.createElement('label');
            lbl2.setAttribute('for', 'inputFoto');
            lbl2.setAttribute('id', 'lblFoto');


            lbl2.classList.remove('spinner2');
            lbl2.classList.add('spinner2');

            document.getElementById('cancelarGuardado').style.display = 'none';

            lbl2.style.background = 'url(' + sessionStorage.getItem('nueva-foto') + ') center / cover'
            lbl2.id = lblFoto.id
            lblFoto.replaceWith(lbl2);
            document.getElementById('inputFoto').disabled = true
            document.getElementById('confirmarGuardado').style.display = 'none';

            document.getElementById('alertaFoto').textContent = 'Guardando foto...'
            setTimeout(() => {
                document.getElementById('confirmarGuardado').textContent = 'Continuar';
                document.getElementById('confirmarGuardado').style.display = '';
                document.getElementById('alertaFoto').textContent = 'Foto actualizada correctamente'
                document.getElementById('confirmarGuardado').addEventListener('click', function () {
                    document.getElementById('modal-foto').style.display = 'none';
                    window.location.reload(true)
                });
            }, 2000);
        })

    });
}

function lanzarModalErrores(mensaje) {
    document.getElementById('modal-errores').style.display = 'flex';
    document.getElementById('mensajeErrores').textContent = mensaje
    document.getElementById('cerrarModalErrores').addEventListener('click', function () {
        document.getElementById('modal-errores').style.display = 'none';
    })
}

function lanzarModalEmail() {
    let confirmar = document.getElementById('confirmarEmail')
    let cancelar = document.getElementById('cancelarEmail')
    let alerta = document.getElementById('alertaEmail')
    document.getElementById('modal-email').style.display = 'flex';

    cancelar.addEventListener('click', function () {
        document.getElementById('modal-email').style.display = 'none';
    });

    confirmar.addEventListener('click', function () {
        let input1 = document.getElementById('inputEmail').value
        let input2 = document.getElementById('inputEmail2').value

        if (input1 != input2) {
            alerta.textContent = 'La direccion de correo electronico no coincide'
        } else {
            if (!validarCorreo(input1)) {
                alerta.textContent = 'Formato de email incorrecto'
            } else {
                let json = {}
                json['email'] = input1

                actualizarEmail(usuario, json).then(function (data) {

                    alerta.textContent = data.mensaje
                    confirmar.textContent = 'Continuar'
                    cancelar.style.display = 'none'
                    alerta.style.color = 'green'
                    confirmar.addEventListener('click', function () {
                        document.getElementById('inputEmail').value = ''
                        document.getElementById('inputEmail').value = ''
                        window.location.reload(true)
                    })
                }).catch(function (error) {
                    window.location.href = '../index.html'
                });
            }
        }

    });
}

function lanzarModalPassword() {
    let confirmar = document.getElementById('confirmarPassword')
    let cancelar = document.getElementById('cancelarPassword')
    let alerta = document.getElementById('alertaPassword')
    document.getElementById('modal-password').style.display = 'flex';

    cancelar.addEventListener('click', function () {
        document.getElementById('modal-password').style.display = 'none';
    });

    confirmar.addEventListener('click', function () {
        let input1 = document.getElementById('inputPassword1').value
        let input2 = document.getElementById('inputPassword2').value

        if (input1 != input2) {
            alerta.textContent = 'Las contraseñas no coinciden'
        } else {
            if (!validarContrasena(input1)) {
                alerta.textContent = 'Formato de contraseña incorrecto'
            } else {
                let json = {}
                json['password'] = input1
               
                actualizarPassword(usuario, json).then(function (data) {

                    alerta.textContent = data.mensaje
                    confirmar.textContent = 'Continuar'
                    cancelar.style.display = 'none'
                    alerta.style.color = 'green'

                    confirmar.addEventListener('click', function () {
                        document.getElementById('inputPassword1').value = ''
                        document.getElementById('inputPassword2').value = ''
                        window.location.reload(true)
                    })
                });
            }
        }

    });
}

function lanzarModalOut() {
    let confirmar = document.getElementById('confirmarOut')
    let cancelar = document.getElementById('cancelarOut')
    let alerta = document.getElementById('alertaOut')
    document.getElementById('modal-out').style.display = 'flex';

    cancelar.addEventListener('click', function () {
        document.getElementById('modal-out').style.display = 'none';
    });

    confirmar.addEventListener('click', function () {

        alerta.textContent = 'Cerrando sesion...'
        sessionStorage.clear()
        cerrarSesion(usuario).then(function () {
            window.location.href = '../index.html'
        })

    });
}


function insertarCabecera() {
    let ultimoAcceso = JSON.parse(sessionStorage.getItem('ultimo-acceso'))
    const cabeceras = {
        diseñador: `
            <nav class="navbar navbar-expand-lg p-6">
            <div class="container-fluid justify-content-center">
            <a style="margin-left: 20px;" class="navbar-brand " href="../views/redirect.html"><img class="foto" src="../images/joya.png" alt="logo"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="col-1"></div>
                <div class="collapse navbar-collapse ps-4" id="navbarNav">
                    <ul class="navbar-nav col-12">
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./listaJoyas.html">Joyas</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./listaJoyasUsuario.html">Tus Joyas</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./designJoya.html">Nueva Joya</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./fabricarJoyas.html">Fabricar</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./historialJoyas.html">Historial</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            `,
        clasificador: `
            <nav class="navbar navbar-expand-lg p-6">
            <div class="container-fluid justify-content-center">
                <a style="margin-left: 20px;" class="navbar-brand " href="../views/redirect.html"><img class="foto" src="../images/joya.png" alt="logo"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="col-1"></div>
                <div class="collapse navbar-collapse ps-4" id="navbarNav">
                    <ul class="navbar-nav col-12">
                      
                    
                        <li class="nav-item">
                            <a class="nav-link" href="./indexClasificador.html">Lotes sin clasificar</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./lotesClasificados.html">Lotes clasificados</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./componentesClasificados.html">Componentes clasificados</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="./clasificadorCrearTipo.html">Crear Tipo</a>
                        </li>
                        <div class="col-1"></div>
                                            
                     
                    </ul>
                </div>
            </div>
        </nav>
            `,
        administrador : `
        <header class="row cabezera " style="position: relative;
     z-index: 1000;">
         
         <nav class="navbar navbar-expand-lg p-6">
             <div class="container-fluid justify-content-center">
                 <a class="navbar-brand" href="./redirect.html"><img src="../images/joya.png" alt="Acceso a roles" style="width: 35px; height: 35px;"></a>
                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>
                 <div class="col-1"></div>
                 <div class="collapse navbar-collapse ps-4" id="navbarNav">
                     <ul class="navbar-nav col-12">
                         <div class="col-1"></div>
                         <li class="nav-item">
                             <a class="nav-link" href="indexAdministrador.html">Inicio</a>
                         </li>
                         <div class="col-1"></div>
                         <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 Usuarios
                             </a>
                             <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                                 <a class="dropdown-item" href="insertarUsuarios.html">Añadir Usuario</a>
                                 <a class="dropdown-item" href="consultarUsuarios.html">Consultar Usuarios</a>
                                 <a class="dropdown-item" href="peticionesUsuarios.html">Peticiones</a>
                             </div>
                         </li>
                         <div class="col-1"></div>
                         <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 Roles
                             </a>
                             <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                                 <a class="dropdown-item" href="insertarRol.html">Añadir Rol</a>
                                 <a class="dropdown-item" href="eliminarRol.html">Eliminar Rol</a>
                             </div>
                         </li>
                         <div class="col-1"></div>
                         <li class="nav-item dropdown">
                             <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 Componentes
                             </a>
                             <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
                                 <a class="dropdown-item" href="insertarComponente.html">Añadir Componente</a>
                                 <a class="dropdown-item" href="consultarComponente.html">Consultar Componentes</a>
                             </div>
                         </li>
                      
                     </ul>
                 </div>
             </div>
         </nav>
     </header>
        
        `,
        colaborador: `
        
        <nav class="navbar navbar-expand-lg p-6">
            <div class="container-fluid justify-content-center">
                <a class="navbar-brand" href="./redirect.html"><img src="../images/joya.png" alt="logo" style="width: 35px; height: 35px;"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="col-1"></div>
                <div class="collapse navbar-collapse ps-4" id="navbarNav">
                    <ul class="navbar-nav col-12">
                        <div class="col-1"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="IndexColaborador.html">Inicio</a>
                        </li>
                        <div class="col-1"></div>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Lotes
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <a class="dropdown-item" href="registrarLotes.html">Nuevo Lote</a>
                                <a class="dropdown-item" href="consultarLote.html">Buscar Lotes</a>
                            </div>
                        </li>
                        <div class="col-1"></div>
                        </li>
                      
                    </ul>
                </div>
            </div>
        `

    };
    cabecera.innerHTML = cabeceras[ultimoAcceso]

}

function lanzarModalPeticion() {
    obtenerRolesAsignados(usuario).then(function (data) {
        rellenarRoles(1, data[0].no_asignados)
        rellenarRoles(2, data[0].asignados)
        let rolesAlta = document.getElementById('rolesAlta')
        let rolesBaja = document.getElementById('rolesBaja')
        let parametros = document.getElementById('parametrosPeticion')
        let confirmar = document.getElementById('confirmarPeticion')
        let cancelar = document.getElementById('cancelarPeticion')
        let alerta = document.getElementById('alertaPeticion')
        parametros.addEventListener('click', function () {
            confirmar.style.display = ''
            if (parametros.value == 1) {
                rolesBaja.style.display = 'none'
                rolesAlta.style.display = ''
            } else {
                rolesBaja.style.display = ''
                rolesAlta.style.display = 'none'
            }
        })
        document.getElementById('modal-peticion').style.display = 'flex';

        cancelar.addEventListener('click', function () {
            document.getElementById('modal-peticion').style.display = 'none';
        });

        confirmar.addEventListener('click', function () {
            let json = {}
            json['solicitud'] = parametros.value
            if (json['solicitud'] == 1) {
             
                json['solicitado'] = rolesAlta.value
            } else {
                json['solicitado'] = rolesBaja.value
            }

            enviarSolicitud(usuario, JSON.stringify(json)).then(function (data) {
               
                alerta.textContent = data.mensaje
                confirmar.style.display='none'
                cancelar.textContent='Continuar'
                cancelar.addEventListener('click',function(){
                    window.location.reload()
                })
            })

        });
    })
}

function rellenarRoles(parametro, roles) {
    if (parametro == 1) {
        let seleccion = document.getElementById('rolesAlta')
        for (let i = 0; i < roles.length; i++) {
            let rol = document.createElement('option')
            rol.value = roles[i].id
            rol.textContent = roles[i].nombre
            seleccion.appendChild(rol)
        }
    }
    if (parametro == 2) {
        let seleccion = document.getElementById('rolesBaja')
        for (let i = 0; i < roles.length; i++) {
            let rol = document.createElement('option')
            rol.value = roles[i].id
            rol.textContent = roles[i].nombre
            seleccion.appendChild(rol)
        }
    }
}

function pintarPeticiones(peticiones){
    let tabla=document.getElementById('tabla_peticiones')
    for (let i=0;i<peticiones.length;i++){
        document.getElementById('tabla-vacia').style.display='none'

        let fila=document.createElement('tr')

        let celdaTipo=document.createElement('td')
        let tipo=document.createElement('span')
         tipo.textContent=peticiones[i].nombre_peticion
        
        let celdaSolicitado=document.createElement('td')
        let solicitado=document.createElement('span')
        solicitado.textContent=peticiones[i].nombre_solicitado
        
        let celdaEstado=document.createElement('td')
        let estado=document.createElement('span')
         estado.textContent=peticiones[i].estado

        celdaTipo.appendChild(tipo)
        celdaSolicitado.appendChild(solicitado)
        celdaEstado.appendChild(estado)

        fila.appendChild(celdaTipo)
        fila.appendChild(celdaSolicitado)
        fila.appendChild(celdaEstado)
        
        tabla.appendChild(fila)
    }
}