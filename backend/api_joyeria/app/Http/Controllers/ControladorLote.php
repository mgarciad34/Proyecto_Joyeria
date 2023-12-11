<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lote;
use Illuminate\Database\QueryException;
use Exception;

class ControladorLote extends Controller
{
    /** Manuel, Oscar */
    function consultarLotesEntregados(){
        try{

            $lotes = Lote::where('estado', '=','entregado')->get();
            $json['lotes']=$lotes;
            return response()->json([ $json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener los lotes'],500);
        }
    }

    function eliminarLote($id) {
        try {
            $lote = Lote::find($id);
            if ($lote) {
                $lote->delete();

                return response()->json(['mensaje' => 'Lote eliminado correctamente'], 200);
            } else {
                return response()->json(['mensaje' => 'Lote no encontrado'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'Error al eliminar el lote'], 500);
        }
    }


    function consultarLotesEntregadosID($id_empresa){
        try{
            $lotes = Lote::where('estado', '=', 'entregado')
                          ->where('id_empresa', '=', $id_empresa)
                          ->get();

            $json['lotes'] = $lotes;
            return response()->json([$json], 200);
        } catch(Exception $e){
            return response()->json(['mensaje' => 'Error al obtener los lotes'], 500);
        }
    }

    function consultarLote($id){
        $lotes = Lote::find($id);
        return response()->json(['mensaje' => $lotes]);
    }


    function insertarLote(Request $request){
        $request->validate([
            'id_empresa' => 'required',
            'latitud' => 'required',
            'longitud' => 'required',
            'estado' => 'required',
        ]);

        $nuevoLote = new Lote();
        $nuevoLote->id_empresa = $request->input('id_empresa');
        $nuevoLote->latitud = $request->input('latitud');
        $nuevoLote->longitud = $request->input('longitud');
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
        $lotes = Lote::all();

        if ($lotes->isEmpty()) {
            return response()->json(['mensaje' => 'No se encontraron lotes'], 404);
        }

        return response()->json(['mensaje' => $lotes]);
    }

    function consultarLotesClasificados(){
        try{

            $lotes = Lote::where('estado', '=','clasificado')->get();
            $json['lotes']=$lotes;
            return response()->json([ $json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener los lotes'],500);
        }
    }
}
