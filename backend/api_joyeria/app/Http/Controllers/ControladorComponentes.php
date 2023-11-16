<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Componente;
use App\Models\Lote;
class ControladorComponentes extends Controller
{
   function guardarElementosLote($id, Request $request){
    // $datosJSON = $request->json()->all();
    $lote=Lote::find($id);
    
    $lista=$request->get('lista');
    foreach ($lista as $elemento) {
        $componente = new Componente();
        $componente->fill($elemento);
        $componente->save();
    }
    $lote->estado='clasificado';
    $lote->save();
    return response()->json(['mensaje'=>'Lote clasificado correctamente']);
   }
}
