<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\HistoricoJoya;
use App\Models\Tipos_componente;
use App\Models\Receta;
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
}
