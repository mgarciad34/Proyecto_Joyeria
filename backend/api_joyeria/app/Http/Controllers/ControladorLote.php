<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lote;
class ControladorLote extends Controller
{
    function consultarLotesNoClasificados(){
        $lotes = Lote::all()->where('estado', '=','entregado');
      
        return response()->json(['mensaje' => $lotes]);
    }
    function consultarLote($id){
        $lotes = Lote::find($id);
        return response()->json(['mensaje' => $lotes]);
    }
}
