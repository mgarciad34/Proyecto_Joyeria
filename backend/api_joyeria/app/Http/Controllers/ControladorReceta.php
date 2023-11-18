<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
class ControladorReceta extends Controller
{
    function getRecetasOfJoya($id){
        $recetas=Receta::all()->where('id_joya','=',$id);
        return response()->json(['recetas'=>$recetas]);
    }
}
