<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Users;
use App\Http\Controllers\ControladorLote;
use App\Http\Controllers\ControladorTipos;
use App\Http\Controllers\ControladorComponentes;
use App\Http\Controllers\ControladorJoya;
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
Route::post('/usuarios', [Users::class, 'crearUsuario']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('consultarLotes',[ControladorLote::class,'consultarLotesNoClasificados']);
Route::get('consultarLoteId/{id}',[ControladorLote::class,'consultarLote']);
Route::get('consultar/tipos',[ControladorTipos::class,'consultarTipos']);

Route::post('lote/clasificar/{id}',[ControladorComponentes::class,'guardarElementosLote']);

Route::post('joya/nueva',[ControladorJoya::class,'nuevaJoya']);