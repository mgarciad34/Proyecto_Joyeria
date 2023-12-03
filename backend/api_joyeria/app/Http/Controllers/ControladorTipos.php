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

    function insertarComponente(Request $request)
    {
       $request->validate([
            'nombre' => 'required',
            'cantidad' => 'required|numeric',
        ]);

        $tipoComponente = new Tipos_componente();
        $tipoComponente->nombre = $request->nombre;
        $tipoComponente->cantidad = $request->cantidad;
        $tipoComponente->save();

        return response()->json(['message' => 'Componente creado exitosamente'], 201);
    }

    public function modificarComponente(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'cantidad' => 'required|numeric',
        ]);

        $tipoComponente = Tipos_componente::find($id);

        if (!$tipoComponente) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $tipoComponente->nombre = $request->nombre;
        $tipoComponente->cantidad = $request->cantidad;

        $tipoComponente->save();

        return response()->json(['message' => 'Componente actualizado exitosamente'], 201);
    }

    public function eliminarComponente($id)
    {
        $tipoComponente = Tipos_componente::find($id);

        if (!$tipoComponente) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $tipoComponente->delete();

        return response()->json(['message' => 'Componente eliminado exitosamente'], 201);
    }
}
