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
    Route::post('logout', [ControladorAuth::class, 'logout']);
    Route::get('', function () {
        return response()->json("No logeado", 203);
    })->name('nologin');
    
    //Rutas agrupadas del administrador
    Route::middleware('auth:sanctum')->group(function () {

    Route::middleware('AdminMid')->group(function () {
        Route::prefix('administrador')->group(function () {
            Route::post('/crear/usuario', [ControladorAdministrador::class, 'crearUsuario']);
            Route::delete('/eliminar/usuario/{id}', [ControladorAdministrador::class, 'eliminarUsuarioId']);
            Route::get('/usuarios', [ControladorAdministrador::class, 'consultarUsuarios']);
            Route::post('/agregar/rol/usuario', [ControladorAdministrador::class, 'insertarRol']);
            Route::delete('/eliminar/rol/usuario', [ControladorAdministrador::class, 'eliminarRol']);
            Route::post('/crear/componente', [ControladorTipos::class, 'insertarComponente']);
            Route::get('/consultar/componentes', [ControladorTipos::class, 'consultarTipos']);
            Route::put('/modificar/componente', [ControladorTipos::class, 'modificarComponente']);
            Route::delete('/eliminar/componente/{id}', [ControladorTipos::class, 'eliminarComponente']);
            Route::get('obtener/roles/{idUsuario}', [ControladorRolAsignado::class, 'obtenerRolesId']);
        });
    });
    
  
    Route::prefix('lotes')->group(function () {
        Route::get('entregados', [ControladorLote::class, 'consultarLotesEntregados'])->middleware('ClasiMid');
            Route::get('clasificados', [ControladorLote::class, 'consultarLotesClasificados'])->middleware('ClasiMid');
            Route::post('', [ControladorLote::class, 'insertarLote'])->middleware('ColabMid');
            Route::put('modificar/estado/{id}', [ControladorLote::class, 'cambiarEstadoLote'])->middleware('ColabMid');
            Route::get('', [ControladorLote::class, 'consultarLotes'])->middleware('ColabMid');
            Route::get('{id}', [ControladorLote::class, 'consultarLote'])->middleware('ColabMid');
            
        });
  
    //** Preguntar a Fernando como hacer que compruebe dos middleware pero que con uno pase */
    Route::prefix('tipos')->group(function () {
        Route::get('', [ControladorTipos::class, 'consultarTipos']);
    });
    Route::middleware('ClasiMid')->group(function () {
        Route::prefix('despieces')->group(function () {
            Route::get('', [ControladorDespieceLotes::class, 'getAllDespieces']);
            Route::get('lote/{id}', [ControladorDespieceLotes::class, 'getDespieceOfLote']);
            Route::post('lote/clasificar/{id}', [ControladorDespieceLotes::class, 'guardarElementosLote']);
        });
    
        
    });
    Route::middleware('DesignMid')->group(function () {
        Route::prefix('joyas')->group(function () {
            Route::post('nueva', [ControladorJoya::class, 'nuevaJoya']);
            Route::put('fabricar/{id}', [ControladorJoya::class, 'fabricarJoya']);
            Route::get('', [ControladorJoya::class, 'getAllJoyas']);
            Route::get('usuario/{id}', [ControladorJoya::class, 'getJoyaFromUsuario']);
            Route::get('historial', [ControladorJoya::class, 'getAllHistorial']);
            Route::delete('{id}', [ControladorJoya::class, 'deleteJoya']);
            Route::get('{id}', [ControladorJoya::class, 'getJoyaById']);
            Route::put('{id}', [ControladorJoya::class, 'updateJoya']);
            Route::get('owner/{id}/{id_usuario}', [ControladorJoya::class, 'ownerJoya']);
            Route::get('/disponibles/lista', [ControladorJoya::class, 'getDisponibles']);
        });

        Route::prefix('recetas')->group(function () {
            Route::get('{id}', [ControladorRec::class, 'getRecetaOfJoya']);
            Route::post('{id}', [ControladorRec::class, 'nuevaReceta']);
        });
    });
});


});

Route::post('testing/{id}',[FotoControlador::class,'cargarImagen']);