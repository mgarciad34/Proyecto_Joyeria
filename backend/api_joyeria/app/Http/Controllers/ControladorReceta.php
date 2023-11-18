<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
class ControladorReceta extends Controller
{
    function getRecetasOfJoya($id){
        $recetas=Receta::where('id_joya','=',$id)->get();
        return response()->json([$recetas]);
    }
}
