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

    function insertarLote(Request $request){
        $request->validate([
            'id_empresa' => 'required',
            'ubicacion' => 'required',
            'estado' => 'required',
        ]);

        $nuevoLote = new Lote();
        $nuevoLote->id_empresa = $request->input('id_empresa');
        $nuevoLote->ubicacion = $request->input('ubicacion');
        $nuevoLote->estado = $request->input('estado');
        $nuevoLote->save();

        return response()->json(['mensaje' => 'Lote insertado correctamente']);
    }

    function cambiarEstadoLote(Request $request, $id){
        $request->validate([
            'estado' => 'required',
        ]);
        $lote = Lote::find($id);

        if (!$lote) {
            return response()->json(['mensaje' => 'Lote no encontrado'], 404);
        }
        $lote->estado = $request->input('estado');
        $lote->save();
        return response()->json(['mensaje' => 'Estado del lote actualizado correctamente']);
    }

    function consultarLotes(Request $request){
        // Obtener todos los lotes
        $lotes = Lote::all();

        // Verificar si se encontraron lotes
        if ($lotes->isEmpty()) {
            return response()->json(['mensaje' => 'No se encontraron lotes'], 404);
        }

        // Devolver una respuesta JSON con la lista de todos los lotes
        return response()->json(['mensaje' => $lotes]);
    }

}
