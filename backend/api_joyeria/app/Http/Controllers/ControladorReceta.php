<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
use App\Models\Detalle_receta;
use App\Models\Tipos_componente;

class ControladorReceta extends Controller
{
    function getRecetaOfJoya($id){
       
        
        $detalle=Detalle_Receta::where('id_joya','=',$id)->get();
        $info['id_joya']=$id;
        for($i=0;$i<count($detalle);$i++){
            $tipo=Tipos_componente::find($detalle[$i]->id_componente);
            $info['detalle'][$i]['id_componente']=$detalle[$i]->id_componente;
            $info['detalle'][$i]['tipo']= $tipo->nombre;
            $info['detalle'][$i]['cantidad_necesaria']=$detalle[$i]->cantidad;
            $info['detalle'][$i]['cantidad_disponible']=$tipo->cantidad;
       
        }
       
        return response()->json($info);
    }
    function nuevaReceta($id,Request $request){
        $receta=new Receta();
        $receta->id_joya=$id;
        $receta->save();

        $detalle=$request->detalle;
      
        for ($i=0;$i<count($detalle);$i++) {
            
            $componente = new Detalle_receta();
            $componente->id_receta=$receta->id;
            $componente->id_componente=$detalle[$i]['tipo'];
            $componente->cantidad=$detalle[$i]['cantidad'];
            $componente->save();
            
            
        }


    }
}
