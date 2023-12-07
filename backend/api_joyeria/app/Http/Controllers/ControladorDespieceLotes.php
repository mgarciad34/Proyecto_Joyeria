<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Despiece_lote;
use App\Models\Lote;
use App\Models\Tipos_componente;
use Exception;
use Illuminate\Support\Facades\Validator;
class ControladorDespieceLotes extends Controller
{
    /**Óscar */
    function guardarElementosLote($id, Request $request){
       
        try{
            $mensajes = [
                'usuario.required' => 'El id de usuario es obligatorio',
                'usuario.integer' => 'El id de usuario debe ser un número entero',
                'lista.required' => 'Es necesario guardar una lista de elementos',
                'lista.array' => 'Debe de enviar la lista de componentes en un formato correcto',
                'lista.*.tipo.required' => 'El atributo tipo es necesario para los elementos',
                'lista.*.tipo.integer' => 'El atributo tipo debe ser un número entero',
                'lista.*.cantidad.required' => 'El atributo cantidad es necesario para los elementos',
                'lista.*.cantidad.integer' =>'El atributo cantidad debe ser un número entero.',
            ];
            
            $validator = Validator::make($request->all(), [
                'usuario' => 'required|integer',
                'lista' => 'required|array',
                'lista.*.tipo' => 'required|integer',
                'lista.*.cantidad' => 'required|integer',
            ], $mensajes);
            
            if ($validator->fails()) {
                return response()->json(['mensaje' => 'Error en el guardado', 'errores' => $validator->errors()], 400);
            }
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
            $mensajes = [
                'required' => 'El de lote es obligatorio.',
                'integer' => 'El de lote  debe ser un número entero.',
                'gt' => 'El id de lote debe ser un número entero positivo.',
            ];
    
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|gt:0',
            ], $mensajes);
    
            if ($validator->fails()) {
                return response()->json(['mensaje' => 'Error en la forma de la peticion', 'errores' => $validator->errors()], 400);
            }
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
