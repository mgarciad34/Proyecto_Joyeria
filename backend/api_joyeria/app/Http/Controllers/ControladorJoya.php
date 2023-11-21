<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\Receta;
class ControladorJoya extends Controller
{
    function nuevaJoya(Request $request){
        $joya=new Joya();
        $joya->nombre=$request->get('nombre');
        $joya->foto=$request->get('foto');
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
}
