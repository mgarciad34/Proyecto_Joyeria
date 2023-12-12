<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FotoControlador;
use App\Http\Controllers\ControladorUsuarios;
use App\Http\Controllers\ControladorAdministrador;
use App\Http\Controllers\ControladorRolAsignado;
use App\Http\Controllers\ControladorAuth;
use App\Http\Controllers\ControladorLote;
use App\Http\Controllers\ControladorTipos;
use App\Http\Controllers\ControladorComponentes;
use App\Http\Controllers\ControladorDespieceLotes;
use App\Http\Controllers\ControladorJoya;
use App\Http\Controllers\ControladorRec;

Route::middleware('cors')->group( function () {


    //Registro de usuarios
    Route::post('/usuarios', [ControladorUsuarios::class, 'crearUsuario']);

    //Login y Logout usuario
    Route::post('login', [ControladorAuth::class, 'login']);
    Route::post('logout/{id}', [ControladorAuth::class, 'logout']);

    //Obtener roles por id
    Route::get('/roles/{id}', [ControladorRolAsignado::class, 'obtenerRolesId']);

    Route::get('', function () {
        return response()->json("No logeado", 203);
    })->name('nologin');

    //Rutas agrupadas del administrador

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('usuarios')->group(function(){
            Route::post('foto/{id}',[FotoControlador::class,'cargarImagen']);
            Route::put('email/{id}',[ControladorUsuarios::class,'updateEmail']);
            Route::put('password/{id}',[ControladorUsuarios::class,'actualizarPassword']);
            Route::get('/roles/{id}', [ControladorRolAsignado::class, 'obtenerRolesPeticion']);
            Route::post('{id}/peticion',[ControladorUsuarios::class,'nuevaPeticion']);
            Route::get('{id}/peticion',[ControladorUsuarios::class,'getPeticionesUsuario']);
        });
        
        //Rutas agrupadas del administrador
    Route::middleware('AdminMid')->group(function () {
        Route::prefix('administrador')->group(function () {
          Route::post('/crear/usuario', [ControladorAdministrador::class, 'crearUsuario']);
          Route::put('/modificar/usuario/{id}', [ControladorAdministrador::class, 'modificarUsuario']);
          Route::delete('/eliminar/usuario/{id}', [ControladorAdministrador::class, 'eliminarUsuarioId']);
          Route::get('/usuarios', [ControladorAdministrador::class, 'consultarUsuarios']);
          Route::post('/agregar/rol/usuario', [ControladorAdministrador::class, 'insertarRol']);
          Route::delete('/eliminar/rol/usuario', [ControladorAdministrador::class, 'eliminarRol']);
          Route::post('/crear/componente', [ControladorTipos::class, 'insertarComponente']);
          Route::get('/consultar/componentes',[ControladorTipos::class,'consultarTipos']);
          Route::put('/modificar/componente/{id}', [ControladorTipos::class, 'modificarComponente']);
          Route::delete('/eliminar/componente/{id}', [ControladorTipos::class, 'eliminarComponente']);
          Route::get('/peticiones', [ControladorAdministrador::class, 'consultarPeticiones']);
          Route::put('/peticiones/{id}', [ControladorAdministrador::class, 'actualizarPeticion']);
        });
    });


    Route::prefix('lotes')->group(function () {
            Route::get('entregados', [ControladorLote::class, 'consultarLotesEntregados'])->middleware('ClasiMid');
            Route::get('entregados/{id}', [ControladorLote::class, 'consultarLotesEntregadosID'])->middleware('ColabMid');
            Route::get('clasificados', [ControladorLote::class, 'consultarLotesClasificados'])->middleware('ClasiMid');
            Route::post('agregar/lote', [ControladorLote::class, 'insertarLote'])->middleware('ColabMid');
            Route::put('modificar/estado/{id}', [ControladorLote::class, 'cambiarEstadoLote'])->middleware('ColabMid');
            Route::get('consultar', [ControladorLote::class, 'consultarLotes'])->middleware('ColabMid');
            Route::delete('/eliminar/{id}', [ControladorLote::class, 'eliminarLote'])->middleware('ColabMid');
            Route::get('consultar/{id}', [ControladorLote::class, 'consultarLote'])->middleware('ColabMid');

        });

    Route::prefix('tipos')->group(function () {
        Route::get('', [ControladorTipos::class, 'consultarTipos']);
        Route::post('', [ControladorTipos::class, 'insertarComponente']);
    });
      
      
    Route::middleware('ClasiMid')->group(function () {
        Route::prefix('despieces')->group(function () {
            Route::get('', [ControladorDespieceLotes::class, 'getAllDespieces']);
            
            Route::prefix('lote')->group(function () {
                Route::get('{id}', [ControladorDespieceLotes::class, 'getDespieceOfLote']);
                Route::post('clasificar/{id}', [ControladorDespieceLotes::class, 'guardarElementosLote']);
            });
            Route::prefix('tipos')->group(function () {
                Route::get('', [ControladorTipos::class, 'consultarTipos']);
                Route::post('', [ControladorTipos::class, 'insertarComponente']);
            });
        });


    });
    Route::middleware('DesignMid')->group(function () {
        Route::prefix('joyas')->group(function () {
            Route::get('tipos', [ControladorTipos::class, 'consultarTipos']);
            Route::post('foto/{id}',[FotoControlador::class,'cargarImagen']);
            Route::post('nueva', [ControladorJoya::class, 'nuevaJoya']);
            Route::put('fabricar/{id}', [ControladorJoya::class, 'fabricarJoya']);
            Route::get('', [ControladorJoya::class, 'getAllJoyas']);
            Route::get('usuario/{id}', [ControladorJoya::class, 'getJoyaFromUsuario']);
            Route::get('historial', [ControladorJoya::class, 'getAllHistorial']);
            Route::delete('{id}', [ControladorJoya::class, 'deleteJoya']);
            Route::get('{id}', [ControladorJoya::class, 'getJoyaById']);
            Route::put('{id}', [ControladorJoya::class, 'updateJoya']);
            Route::get('owner/{id}/{id_usuario}', [ControladorJoya::class, 'ownerJoya']);
            Route::prefix('/disponibles')->group(function () {
                Route::get('/lista', [ControladorJoya::class, 'getDisponibles']);
                Route::get('/recomendaciones/{parametro}', [ControladorJoya::class, 'getRecomendaciones']);
            });
            Route::get('/receta/generador',[ControladorRec::class,'algoritmoReceta']);
            
        });

        Route::prefix('recetas')->group(function () {
            Route::get('{id}', [ControladorRec::class, 'getRecetaOfJoya']);
        });
    });
});


});

Route::get('test', [ControladorUsuarios::class, 'testMany']);