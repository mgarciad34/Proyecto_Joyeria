<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\HistoricoJoya;
use App\Models\Tipos_componente;
use App\Models\Receta;
use App\Http\Controllers\FotoControlador;
use App\Models\User;
use App\Http\Controllers\ControladorReceta;
use App\Http\Controllers\ControladorRec;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ControladorJoya extends Controller
{
    /**Óscar */
    function nuevaJoya(Request $request){
        try{
            $mensajes = [
                'nombre.required' => 'El campo nombre es obligatorio.',
                'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
                'nombre.max' => 'El campo nombre no debe exceder los 255 caracteres.',
                'id_usuario.required' => 'El campo id_usuario es obligatorio.',
                'id_usuario.integer' => 'El campo id_usuario debe ser un número entero.',
                'detalle.required' => 'El campo detalle es obligatorio.',
                'detalle.array' => 'El campo detalle debe tener un formato correcto.',
                'detalle.*.tipo.required' => 'El campo tipo en detalle es obligatorio.',
                'detalle.*.tipo.integer' => 'El campo tipo en detalle debe ser un número entero.',
                'detalle.*.cantidad.required' => 'El campo cantidad en detalle es obligatorio.',
                'detalle.*.cantidad.integer' => 'El campo cantidad en detalle debe ser un número entero.',
            ];
    
           
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:255',
                'id_usuario' => 'required|integer',
                'detalle' => 'required|array',
                'detalle.*.tipo' => 'required|integer',
                'detalle.*.cantidad' => 'required|integer',
            ], $mensajes);
    
            if ($validator->fails()) {
                return response()->json(['mensaje' => 'Error en la validación', 'errores' => $validator->errors()], 400);
            }

            $joya=new Joya();
            $joya->nombre=$request->get('nombre');
            // $joya->foto=$request->get('foto');
            $joya->id_usuario=$request->get('id_usuario');
            $joya->save();
            $joya->foto="https://jawa-oscar.s3.eu-west-3.amazonaws.com/joyas/".$joya->id;
            $joya->save();
            $detalle=$request->detalle;
            
            for ($i=0;$i<count($detalle);$i++) {
                
                $componente = new Detalle_receta();
                $componente->id_joya=$joya->id;
                $componente->id_componente=$detalle[$i]['tipo'];
                $componente->cantidad=$detalle[$i]['cantidad'];
                $componente->save();
                
                
            }
            
            return response()->json(['mensaje'=>'Nueva joya registrada correctamente','id'=>$joya->id],201);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al crear la joya'],400);
        }
    }
    /**Óscar */
    function getAllJoyas(){
        try{

            $joyas=Joya::all();
            for($i=0;$i<count($joyas);$i++){
                $usuario=User::find($joyas[$i]->id_usuario);
                $joyas[$i]->creador=$usuario->name;
            }
           
            return response()->json([$joyas],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener las joyas'],500);
        }
    }
    /**Óscar */
    function fabricarJoya($id, Request $request){
        try{
            $mensajes = [
                'id_usuario.required' => 'El campo :attribute es obligatorio.',
                'id_usuario.integer' => 'El campo :attribute debe ser un número entero.',
            ];
            $validator = Validator::make($request->all(), [
                'id_usuario' => 'required|integer',
            ], $mensajes);
    
            if ($validator->fails()) {
                return response()->json(['mensaje' => 'Error en la validación', 'errores' => $validator->errors()], 400);
            }

            $historico= new HistoricoJoya();
            $historico->id_joya=$id;
            $historico->id_usuario=$request->get('id_usuario');
            $historico->creado=now();
            $historico->save();
            $receta=Detalle_receta::where('id_joya','=',$id)->get();
            print_r($receta[0]->id_componente);
            for($i=0;$i<count($receta);$i++){
                $tipo=Tipos_componente::find($receta[$i]->id_componente);
                $tipo->cantidad-=$receta[$i]->cantidad;
                $tipo->save();
            }
            return response()->json(['mensaje'=>'Fabricado correctamente'],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al fabricar la joya'],404);
        }
    }
/**Óscar */
    function getJoyaFromUsuario($id){
        try{

            $joyas=Joya::where('id_usuario','=',$id)->get();
            return response()->json([$joyas],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener la joya del usuario'],404);
        }
    }
/**Óscar */
    function getAllHistorial(){
        try{

            $historico['h']=HistoricoJoya::all();
            $enviar=[];
            for($i=0;$i<count($historico['h']);$i++){
                $joya=Joya::find($historico['h'][$i]->id_joya);
                if($joya){
                    $usuario=User::find($historico['h'][$i]->id_usuario);
                    $historico['h'][$i]->creador=$usuario->name;
                    $historico['h'][$i]->nombre_joya=$joya->nombre;
                    $historico['h'][$i]->foto=$joya->foto;
                    $enviar['historial'][]=$historico['h'][$i];
                }else{
                    
                }
             
            }
             return response()->json([$enviar],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener el historial','error'=>$e->getMessage()],500);
        }
    }
    /**Óscar */
    function deleteJoya($id){
        try{

            $joya=Joya::find($id);
            $joya->delete();
            return response()->json(['mensaje'=>'Eliminado correctamente'],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al eliminar la joya'],404);
        }
    }
    /**Óscar */
    function getJoyaById($id){
        try{

            $joya = Joya::findOrFail($id);
          
            return response()->json($joya,200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener la joya'],404);
        }
    }
    /**Óscar */
    function updateJoya($id,Request $request){
        try{
          
            $mensajes = [
                'joya_original.nombre.required' => 'El campo :attribute es obligatorio.',
                'joya_original.nombre.string' => 'El campo :attribute debe ser una cadena de texto.',
                'joya_original.nombre.max' => 'El campo :attribute no debe exceder los 255 caracteres.',
                'joya.nombre.required' => 'El campo :attribute es obligatorio.',
                'joya.nombre.string' => 'El campo :attribute debe ser una cadena de texto.',
                'joya.nombre.max' => 'El campo :attribute no debe exceder los 255 caracteres.',
                'joya_original.detalle.required' => 'El campo :attribute es obligatorio.',
                'joya_original.detalle.array' => 'El campo :attribute debe tener un formato correcto.',
                'joya.detalle.required' => 'El campo :attribute es obligatorio.',
                'joya.detalle.array' => 'El campo :attribute debe tener un formato correcto.',
            ];
    
            $validator = Validator::make($request->all(),[
                'joya_original.nombre' => 'required|string|max:255',
                'joya.nombre' => 'required|string|max:255',
                'joya_original.detalle' => 'required|array',
                'joya.detalle' => 'required|array',
            ], $mensajes);
    
       
            if ($validator->fails()) {
                return response()->json(['mensaje' => 'Error en la validación', 'errores' => $validator->errors()], 400);
            }

            $joya=Joya::find($id);
            $detalle=Detalle_receta::where('id_joya','=',$id)->get();
            $joyaOriginal=$request->get('joya_original');
            $joyaUpdate=$request->get('joya');
            
            if($joyaOriginal['nombre']!=$joyaUpdate['nombre']){
                $joya->nombre=$joyaUpdate['nombre'];
                
            }
            $joya->save();
            if($joyaUpdate['detalle']!=$joyaOriginal['detalle']){
                $c=new ControladorRec;
                $c->updateReceta($id,$joyaOriginal['detalle'],$joyaUpdate['detalle']);
            }
            return response()->json(['mensaje'=>'Actualizado correctamente'],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al actualizar la joya'],400);
        }
            
    }
    /**Óscar */
    function ownerJoya($id,$id_usuario){
       try{

           $cuenta=Joya::where('id','=',$id)->where('id_usuario','=',$id_usuario)->count();
           return response()->json(['resultado'=>$cuenta>0],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener el resultado'],400);
        }
        }
/**Óscar */
    function getDisponibles(){
        try{

            $disponibles=[];
            $joyas=DB::select('SELECT j.id AS id_joya,
            FLOOR(MIN(tc.cantidad / dr.cantidad))
            AS veces_fabricacion FROM joyas j
            JOIN detalle_recetas dr ON j.id = dr.id_joya
            JOIN tipos_componentes tc ON dr.id_componente = tc.id
            GROUP BY j.id HAVING COUNT(dr.id_componente) =
            (SELECT COUNT(*) FROM detalle_recetas WHERE id_joya = j.id)
            AND MIN(tc.cantidad / dr.cantidad)>=1
        ');
      for ($i=0;$i<count($joyas);$i++){
          $joya=Joya::find($joyas[$i]->id_joya);
          $usuario=User::find($joya->id_usuario);
          $joya->creador=$usuario->name;
          $joya->fabricaciones=$joyas[$i]->veces_fabricacion;
          $disponibles[]=$joya;
          
        }
        return response()->json([$disponibles],200);
    }catch(Exception $e){
        return response()->json(['mensaje'=>'Error al obtener las joyas fabricables'],500);
    }

    }
}
