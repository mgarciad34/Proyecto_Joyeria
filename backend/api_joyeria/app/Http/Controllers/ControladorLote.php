<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lote;
use App\Models\User;
use Exception;

class ControladorLote extends Controller
{
    /**  Óscar */
    function consultarLotesEntregados(){
        try{

            $lotes = Lote::where('estado', '=','entregado')->get();
            for($i=0;$i<count($lotes);$i++){
                $colaborador=User::find($lotes[$i]->id_empresa);
                $lotes[$i]->colaborador=$colaborador->name;
            }
            $json['lotes']=$lotes;
            return response()->json([ $json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener los lotes'],500);
        }
        }
        /**Manuel */
    function consultarLote($id){
        $lotes = Lote::find($id);
        return response()->json(['mensaje' => $lotes]);
    }
    
    /**Manuel */
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
    /**Manuel */
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
    /**Manuel */
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

    /**Oscar */
    function consultarLotesClasificados(){
        try{

            $lotes = Lote::where('estado', '=','clasificado')->get();
            for($i=0;$i<count($lotes);$i++){
                $colaborador=User::find($lotes[$i]->id_empresa);
                $lotes[$i]->colaborador=$colaborador->name;
                $clasificador=User::find($lotes[$i]->id_clasificador);
                $lotes[$i]->clasificador=$clasificador->name;
            }
            $json['lotes']=$lotes;
            return response()->json([ $json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener los lotes'],500);
        }
    }
}
