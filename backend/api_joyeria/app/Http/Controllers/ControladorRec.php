<?php

namespace App\Http\Controllers;
use App\Models\Detalle_receta;
use App\Models\Tipos_componente;
use Exception;
use Illuminate\Http\Request;

class ControladorRec extends Controller
{
    /**Óscar */
    function getRecetaOfJoya($id){
       
        try{

            $detalle=Detalle_Receta::where('id_joya','=',$id)->get();
            $info['id_joya']=$id;
            for($i=0;$i<count($detalle);$i++){
                $tipo=Tipos_componente::find($detalle[$i]->id_componente);
                $info['detalle'][$i]['id_componente']=$detalle[$i]->id_componente;
                $info['detalle'][$i]['tipo']= $tipo->nombre;
                $info['detalle'][$i]['cantidad_necesaria']=$detalle[$i]->cantidad;
                $info['detalle'][$i]['cantidad_disponible']=$tipo->cantidad;
                
            }
        
            return response()->json($info,200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener la receta'],404);
        }
    }
  /**Óscar */
    function updateReceta($id_joya,$antigua,$nueva){
        try{

            $componentesNuevaReceta=[];
            $componentesViejaReceta=[];
            
            for ($i=0;$i<count($antigua);$i++){
                $componentesViejaReceta[]=$antigua[$i]['id_componente'];
            }
            for ($i=0;$i<count($nueva);$i++){
                $id=$nueva[$i]['id_componente'];
                $componentesNuevaReceta[]=$id;
                
                if (in_array($id, $componentesViejaReceta)) {
                    $sigue=false;
                $x=0;
                while($x<count($antigua) && !$sigue){
                    if($antigua[$x]['id_componente']==$id){
                        $sigue=true;
                        if($antigua[$x]['cantidad']!=$nueva[$i]['cantidad']){
                            $actualizar=Detalle_receta::where('id_joya','=',$id_joya)->where('id_componente','=',$id);
                            $actualizar->update(['cantidad'=>$nueva[$i]['cantidad']]);
                            
                        }
                    }
                    $x++;
                }
                
            }else{
                $detalle_receta=new Detalle_receta();
                $detalle_receta->id_joya=$id_joya;
                $detalle_receta->id_componente=$id;
                $detalle_receta->cantidad=$nueva[$i]['cantidad'];
                $detalle_receta->save();
            }
        }
        for($i=0;$i<count($componentesViejaReceta);$i++){
            if (!in_array($componentesViejaReceta[$i], $componentesNuevaReceta)) {
              $eliminar=Detalle_receta::where('id_joya','=',$id_joya)
              ->where('id_componente','=',$componentesViejaReceta[$i]);
              $eliminar->delete();
            }
        }
        return true;
    }catch(Exception $e){
        return $e;
    }
}
}
