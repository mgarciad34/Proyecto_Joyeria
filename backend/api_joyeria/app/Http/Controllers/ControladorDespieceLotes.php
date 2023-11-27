<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Despiece_lote;
use App\Models\Lote;
use App\Models\Tipos_componente;

class ControladorDespieceLotes extends Controller
{
    function guardarElementosLote($id, Request $request){
        // $datosJSON = $request->json()->all();
        $lote=Lote::find($id);
        
        $lista=$request->get('lista');
        foreach ($lista as $elemento) {
            $componente = new Despiece_lote();
            $componente->fill($elemento);
            $componente->save();
            $tipo=Tipos_componente::Find($componente->tipo);
            $tipo->cantidad+=$componente->cantidad;
            $tipo->save();
        }
        $lote->estado='clasificado';
        $lote->save();
        return response()->json(['mensaje'=>'Lote clasificado correctamente']);
       }
}
