<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\HistoricoJoya;
use App\Models\Tipos_componente;
use App\Models\Receta;
use App\Http\Controllers\ControladorReceta;
use Illuminate\Support\Facades\DB;
class ControladorJoya extends Controller
{
    function nuevaJoya(Request $request){
        $joya=new Joya();
        $joya->nombre=$request->get('nombre');
        $joya->foto=$request->get('foto');
        $joya->id_usuario=$request->get('id_usuario');
        $joya->save();
        

        $detalle=$request->detalle;
      
        for ($i=0;$i<count($detalle);$i++) {
            
            $componente = new Detalle_receta();
            $componente->id_joya=$joya->id;
            $componente->id_componente=$detalle[$i]['tipo'];
            $componente->cantidad=$detalle[$i]['cantidad'];
            $componente->save();
            
            
        }
    
        return response()->json(['Nueva joya registrada correctamente']);
    }
    function getAllJoyas(){
        $joyas=Joya::all();

        return response()->json([$joyas]);
    }
    function fabricarJoya($id, Request $request){
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
        return response()->json(['Fabricado correctamente']);
    }

    function getJoyaFromUsuario($id){
        $joyas=Joya::where('id_usuario','=',$id)->get();
        return response()->json([$joyas]);
    }

    function getAllHistorial(){
        $historial['historial']=HistoricoJoya::all();
        return response()->json([$historial]);
    }
    function deleteJoya($id){
        $joya=Joya::find($id);
        $joya->delete();
        $detalle=Detalle_receta::where('id_joya',$id);
        $detalle->delete();
        return response()->json(['Eliminado correctamente']);
    }
    function getJoyaById($id){
        $joya=Joya::find($id);
        return response()->json($joya);
    }
    function updateJoya($id,Request $request){
        $joya=Joya::find($id);
        $detalle=Detalle_receta::where('id_joya','=',$id)->get();
        $joyaOriginal=$request->get('joya_original');
        $joyaUpdate=$request->get('joya');
   
        if($joyaOriginal['nombre']!=$joyaUpdate['nombre']){
            $joya->nombre=$joyaUpdate['nombre'];
         
        }
        if($joyaOriginal['foto']!=$joyaUpdate['foto']){
            $joya->foto=$joyaUpdate['foto'];
        }
        $joya->save();
        if($joyaUpdate['detalle']!=$joyaOriginal['detalle']){
            $c=new ControladorReceta;
           $c->updateReceta($id,$joyaOriginal['detalle'],$joyaUpdate['detalle']);
        }
        // for($i=0;$i<count($detalle);$i++)
        // print_r($detalle[$i]->id_componente);
    }
    function ownerJoya($id,$id_usuario){
       
        $cuenta=Joya::where('id','=',$id)->where('id_usuario','=',$id_usuario)->count();
            return response()->json(['resultado'=>$cuenta>0]);
        }

    function getDisponibles(){
        $disponibles=[];
        $joyas=DB::select('SELECT DISTINCT j.id AS id_joya FROM joyas j 
        JOIN detalle_recetas dr ON j.id = dr.id_joya 
        JOIN tipos_componentes tc ON dr.id_componente = tc.id 
        WHERE tc.cantidad >= dr.cantidad;');
      for ($i=0;$i<count($joyas);$i++){
        $joya=Joya::find($joyas[$i]->id_joya);
        $disponibles[]=$joya;
        
      }
      return response()->json([$disponibles]);
    }
}
