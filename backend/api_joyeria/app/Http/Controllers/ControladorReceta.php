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
    // function nuevaReceta($id,Request $request){
    //     // $receta=new Receta();
    //     $receta->id_joya=$id;
    //     $receta->save();

    //     $detalle=$request->detalle;
      
    //     for ($i=0;$i<count($detalle);$i++) {
            
    //         $componente = new Detalle_receta();
    //         $componente->id_receta=$receta->id;
    //         $componente->id_componente=$detalle[$i]['tipo'];
    //         $componente->cantidad=$detalle[$i]['cantidad'];
    //         $componente->save();
            
            
    //     }


    // }
    function updateReceta($id_joya,$antigua,$nueva){
        $componentesNuevaReceta=[];
        $componentesViejaReceta=[];

        for ($i=0;$i<count($antigua);$i++){
            $componentesViejaReceta[]=$antigua[$i]['id_componente'];
        }
        print_r($componentesViejaReceta);
        print_r('<br>');
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

                }

            }else{
               $detalle_receta=new Detalle_receta();
               $detalle_receta->id_joya=$id_joya;
               $detalle_receta->id_componente=$id;
               $detalle_receta->cantidad=$nueva[$i]['cantidad'];
              $detalle_receta->save();
            }
        }
        print_r(count($componentesNuevaReceta));
        for($i=0;$i<count($componentesViejaReceta);$i++){
            if (!in_array($componentesViejaReceta[$i], $componentesNuevaReceta)) {
              $eliminar=Detalle_receta::where('id_joya','=',$id_joya)
              ->where('id_componente','=',$componentesViejaReceta[$i]);
              $eliminar->delete();
            }
        }

    }
}
