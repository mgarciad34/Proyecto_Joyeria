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
    function updateReceta($id_joya,$antigua,$nueva){
        for($i=0;$i<count($nueva);$i++){
          
            for($x=0;$x<count($antigua);$x++){
                $existe=false;
                $distinta=false;
               
                if($nueva[$i]['id_componente']==$antigua[$x]['id_componente']){
                    $existe=true;
                    if($nueva[$i]['cantidad']!=$antigua[$x]['cantidad']){
                        $distinta=true;
                    }
                }
                print_r('vuleta');
                if($existe){
                    if($distinta){
                        $detalle_receta=Detalle_receta::where('id_joya','=', $id_joya)->where('id_componente','=',$nueva[$i]['id_componente']);
                        
                        $detalle_receta->update(['cantidad'=>$nueva[$i]['cantidad']]);
                    }
                }else{
                    $detalle_receta=Detalle_receta::where('id_joya','=', $id_joya)->where('id_componente','=',$antigua[$x]['id_componente'])->get();
                    print_r($detalle_receta->count());
                    if($detalle_receta->count()>0){
                    //   Detalle_receta::where('id_joya','=', $id_joya)->where('id_componente','=',$antigua[$x]['id_componente'])->delete();;
                    }else{
                        print_r('llega');
                        // $detalle_receta=new Detalle_receta();
                        // $detalle_receta->id_componente=$nueva[$i]['id_componente'];
                        // $detalle_receta->id_joya=$id_joya;
                        // $detalle_receta->cantidad=$nueva[$i]['cantidad'];
                        // $detalle_receta->save();
                    }
                }
            }
           

        }
  
      
    }
}
