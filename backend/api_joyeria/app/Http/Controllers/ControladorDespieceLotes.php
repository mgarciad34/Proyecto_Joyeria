<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Despiece_lote;
use App\Models\Lote;
use App\Models\Tipos_componente;
use Exception;
/**Óscar */
class ControladorDespieceLotes extends Controller
{
    function guardarElementosLote($id, Request $request){
       
        try{

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
        return response()->json(['mensaje'=>'Lote clasificado correctamente'],200);
    }catch(Exception $e){
        return response()->json(['mensaje'=>'Error al clasificar'],500);
    }
       }
       /**Óscar */
       function getDespieceOfLote($id){
        try{

            $despiece['despiece']=Despiece_lote::where('id_lote',$id)->get();
            
            return response()->json([$despiece],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'No se encuentro el despiece'],404);
        }
       }
/**Óscar */
       function getAllDespieces(){
        try{

            $despiece['componentes']=Despiece_lote::all();
            return response()->json($despiece,200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener los despieces'],404);
        }
       }
}
