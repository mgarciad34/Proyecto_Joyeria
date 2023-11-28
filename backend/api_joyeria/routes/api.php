<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControladorUsuarios;
use App\Http\Controllers\ControladorAuth;
use App\Http\Controllers\ControladorLote;
use App\Http\Controllers\ControladorTipos;
use App\Http\Controllers\ControladorComponentes;
use App\Http\Controllers\ControladorJoya;
use App\Http\Controllers\ControladorAdministrador;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


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

Route::post('consultarlotes',[ControladorLote::class,'insertarLote']);
Route::put('modificar/estado/{id}',[ControladorLote::class,'cambiarEstadoLote']);
//Consultar Lotes
Route::get('consultar/lotes',[ControladorLote::class,'consultarLotes']);
//Consultar Lotes sin clasificar
Route::get('consultarLotes',[ControladorLote::class,'consultarLotesNoClasificados']);
Route::get('consultarLoteId/{id}',[ControladorLote::class,'consultarLote']);

Route::get('consultar/tipos',[ControladorTipos::class,'consultarTipos']);

Route::post('lote/clasificar/{id}',[ControladorComponentes::class,'guardarElementosLote']);

Route::post('joya/nueva',[ControladorJoya::class,'nuevaJoya']);
