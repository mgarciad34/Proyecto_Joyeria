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
        $idClasificador=$request->usuario;
        $lista=$request->get('lista');
        foreach ($lista as $elemento) {
            $componente = new Despiece_lote();
            $componente->fill($elemento);
            $componente->id_clasificador=$idClasificador;
            $componente->id_lote=$id;
            $componente->save();
            $tipo=Tipos_componente::Find($componente->tipo);
            $tipo->cantidad+=$componente->cantidad;
            $tipo->save();
        }
        $lote->id_clasificador=$idClasificador;
        $lote->estado='clasificado';
        $lote->save();
        return response()->json(['mensaje'=>'Lote clasificado correctamente']);
       }
}
