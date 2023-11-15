<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class Users extends Controller
{
    //
    public function crearUsuario(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'rol' => 'required|string',
                'password' => 'required|string|min:6',
            ]);

            $nuevoUsuario = new User();

            $nuevoUsuario->name = $request->input('name');
            $nuevoUsuario->email = $request->input('email');
            $nuevoUsuario->rol = $request->input('rol');
            $nuevoUsuario->password = bcrypt($request->input('password'));

            $nuevoUsuario->save();

            return response()->json(['message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
