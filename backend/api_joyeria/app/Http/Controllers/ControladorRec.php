<?php

namespace App\Http\Controllers;

use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\Tipos_componente;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControladorRec extends Controller
{
    /**Óscar */
    function getRecetaOfJoya($id)
    {

        try {

            $detalle = Detalle_Receta::where('id_joya', '=', $id)->get();
            $info['id_joya'] = $id;
            for ($i = 0; $i < count($detalle); $i++) {
                $tipo = Tipos_componente::find($detalle[$i]->id_componente);
                $info['detalle'][$i]['id_componente'] = $detalle[$i]->id_componente;
                $info['detalle'][$i]['tipo'] = $tipo->nombre;
                $info['detalle'][$i]['cantidad_necesaria'] = $detalle[$i]->cantidad;
                $info['detalle'][$i]['cantidad_disponible'] = $tipo->cantidad;
            }
            $joya = Joya::find($id);
            $info['nombre'] = $joya->nombre;

            return response()->json($info, 200);
        } catch (Exception $e) {
            return response()->json(['mensaje' => 'Error al obtener la receta'], 404);
        }
    }
    /**Óscar */
    function updateReceta($id_joya, $antigua, $nueva)
    {
        try {

            $componentesNuevaReceta = [];
            $componentesViejaReceta = [];

            for ($i = 0; $i < count($antigua); $i++) {
                $componentesViejaReceta[] = $antigua[$i]['id_componente'];
            }
            for ($i = 0; $i < count($nueva); $i++) {
                $id = $nueva[$i]['id_componente'];
                $componentesNuevaReceta[] = $id;

                if (in_array($id, $componentesViejaReceta)) {
                    $sigue = false;
                    $x = 0;
                    while ($x < count($antigua) && !$sigue) {
                        if ($antigua[$x]['id_componente'] == $id) {
                            $sigue = true;
                            if ($antigua[$x]['cantidad'] != $nueva[$i]['cantidad']) {
                                $actualizar = Detalle_receta::where('id_joya', '=', $id_joya)->where('id_componente', '=', $id);
                                $actualizar->update(['cantidad' => $nueva[$i]['cantidad']]);
                            }
                        }
                        $x++;
                    }
                } else {
                    $detalle_receta = new Detalle_receta();
                    $detalle_receta->id_joya = $id_joya;
                    $detalle_receta->id_componente = $id;
                    $detalle_receta->cantidad = $nueva[$i]['cantidad'];
                    $detalle_receta->save();
                }
            }
            for ($i = 0; $i < count($componentesViejaReceta); $i++) {
                if (!in_array($componentesViejaReceta[$i], $componentesNuevaReceta)) {
                    $eliminar = Detalle_receta::where('id_joya', '=', $id_joya)
                        ->where('id_componente', '=', $componentesViejaReceta[$i]);
                    $eliminar->delete();
                }
            }
            return true;
        } catch (Exception $e) {
            return $e;
        }
    }

    function algoritmoReceta()
    {
        try{

            $parametroGeneral = 3;
            $numeroComponentes = DB::select("SELECT MAX(contador) as 'maximo', 
    MIN(contador) as 'minimo',
    ROUND(AVG(contador)) as 'media'
    FROM ( SELECT COUNT(id_joya)
    as contador FROM `detalle_recetas`
    GROUP BY id_joya ) as contadores; ");
        $n = [];

        for ($i = 0; $i < $parametroGeneral; $i++) {
            $n[]['numero'] = rand($numeroComponentes[0]->minimo, $numeroComponentes[0]->maximo);
            $n[$i]['puntuacion'] = $n[$i]['numero'] - $numeroComponentes[0]->media;
        }

        for ($i = 0; $i < count($n); $i++) {
            if ($n[$i]['puntuacion'] < 0) {
                $n[$i]['puntuacion'] = -$n[$i]['puntuacion'];
            }
        }

        $numeroComponentesResultado = $n[0];
        for ($i = 1; $i < count($n); $i++) {
            if ($n[$i]['puntuacion'] < $numeroComponentesResultado['puntuacion']) {
                $numeroComponentesResultado = $n[$i];
            }
        }
        $receta = [];
        $ids = Tipos_componente::all();
        
        while (count($receta) < $numeroComponentesResultado['numero']) {
            
            $componentes = [];
            for ($x = 0; $x < $parametroGeneral; $x++) {
                $componentes[]=$ids[rand(0,count($ids)-1)];
            }
            
            for($x=0;$x<count($componentes);$x++){
               
                $parametrosPuntuacionesComponentes['apariciones'] =
                DB::select("SELECT COUNT(`id_joya`)
                 as total FROM `detalle_recetas`
                 UNION ALL SELECT COUNT(`id_componente`)
                 FROM `detalle_recetas` WHERE `id_componente` = ?; ",[$componentes[$x]->id]);

                $parametrosPuntuacionesComponentes['disponibilidad']=DB::select("SELECT id, cantidad -
                (SELECT ROUND(AVG(cantidad), 2)
                 FROM tipos_componentes) AS porcentaje FROM tipos_componentes WHERE id = ?",[$componentes[$x]->id]);
        
                $componentes[$x]['puntuacion']=
                ($parametrosPuntuacionesComponentes['apariciones'][0]
                ->total-$parametrosPuntuacionesComponentes['apariciones'][1]->total)*0.5;

                $componentes[$x]['puntuacion']+=$parametrosPuntuacionesComponentes['disponibilidad'][0]->porcentaje*0.5;
            }
            $ganador=$componentes[0];
            for($x=1;$x<count($componentes);$x++){
                if($ganador['puntuacion']<$componentes[$x]['puntuacion']){
                    $ganador=$componentes[$x];
                }
            }
            $esta=false;
            for($x=0;$x<count($receta);$x++){
                if($ganador->id==$receta[$x]->id){
                    $esta=true;
                }
            }
            if(!$esta){
                
                $receta[]=$ganador;
            }
        }

        for($x=0;$x<count($receta);$x++){
            $cantidad = DB::select("SELECT ROUND(COALESCE(AVG(cantidad), 1)) AS cantidad
            FROM `detalle_recetas`
            WHERE id_componente = ?",[$receta[$x]->id]);
            $receta[$x]->cantidad=$cantidad[0];
        }
        $json=[];
        $json['receta']=$receta;
        return response()->json($json,200);
    }catch(Exception $e){
        return response()->json(['mensaje'=>'Error al generar la receta'],500);
    }
}
}
