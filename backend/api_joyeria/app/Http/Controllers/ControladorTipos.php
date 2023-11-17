<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tipos_componente;
class ControladorTipos extends Controller
{
    function consultarTipos(){
        $tipos = Tipos_componente::all();
        return response()->json(['tipos' => $tipos]);
    }
}
