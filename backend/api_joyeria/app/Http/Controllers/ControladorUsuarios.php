<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Http\Controllers\ControladorRolAsignado;

class ControladorUsuarios extends Controller
{
    //
    public function crearUsuario(Request $request)
    {

        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $nuevoUsuario = new Usuario();

            $nuevoUsuario->name = $request->input('name');
            $nuevoUsuario->email = $request->input('email');
            $nuevoUsuario->password = bcrypt($request->input('password'));

            $nuevoUsuario->save();

            $controladorRolAsignado = new ControladorRolAsignado();
            $controladorRolAsignado->InsertarRol($nuevoUsuario->id, "4");

            return response()->json(['message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
