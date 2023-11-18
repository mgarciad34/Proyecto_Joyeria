<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
use App\Models\Detalle_receta;
class ControladorReceta extends Controller
{
    function getRecetasOfJoya($id){
        $recetas=Receta::where('id_joya','=',$id)->get();
        return response()->json([$recetas]);
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
