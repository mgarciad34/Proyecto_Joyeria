<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControladorUsuarios;
use App\Http\Controllers\ControladorAuth;
use App\Http\Controllers\ControladorLote;
use App\Http\Controllers\ControladorTipos;
use App\Http\Controllers\ControladorComponentes;
use App\Http\Controllers\ControladorDespieceLotes;
use App\Http\Controllers\ControladorJoya;
use App\Http\Controllers\ControladorRec;
//Registro de usuarios
Route::post('/usuarios', [ControladorUsuarios::class, 'crearUsuario']);

//Login y Logout usuario
Route::post('login', [ControladorAuth::class, 'login']);
Route::post('logout', [ControladorAuth::class, 'logout']);

//Rutas agrupadas del administrador
Route::prefix('administrador')->group(function () {
    Route::post('/crear/usuario', [ControladorAdministrador::class, 'crearUsuario']);
    Route::post('/agregar/rol/usuario', [ControladorAdministrador::class, 'insertarRol']);
    Route::delete('/eliminar/rol/usuario', [ControladorAdministrador::class, 'eliminarRol']);
    Route::post('/crear/componente', [ControladorTipos::class, 'insertarComponente']);
    Route::get('/consultar/componentes',[ControladorTipos::class,'consultarTipos']);
    Route::put('/modificar/componente', [ControladorTipos::class, 'modificarComponente']);
    Route::delete('/eliminar/componente', [ControladorTipos::class, 'eliminarComponente']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('lotes')->group(function () {
    Route::post('', [ControladorLote::class, 'insertarLote']);
    Route::put('modificar/estado/{id}', [ControladorLote::class, 'cambiarEstadoLote']);
    Route::get('', [ControladorLote::class, 'consultarLotes']);
    Route::get('entregados', [ControladorLote::class, 'consultarLotesEntregados']);
    Route::get('clasificados', [ControladorLote::class, 'consultarLotesClasificados']);
    Route::get('{id}', [ControladorLote::class, 'consultarLote']);
});

Route::prefix('tipos')->group(function () {
    Route::get('', [ControladorTipos::class, 'consultarTipos']);
});

Route::prefix('despieces')->group(function () {
    Route::get('', [ControladorDespieceLotes::class, 'getAllDespieces']);
    Route::get('lote/{id}', [ControladorDespieceLotes::class, 'getDespieceOfLote']);
    Route::post('lote/clasificar/{id}', [ControladorDespieceLotes::class, 'guardarElementosLote']);
});

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