<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RolAsignado;
use App\Models\Rol;

class ControladorAdministrador extends Controller
{
    //
    //Funcion para crear el usuario
    //En esta funcion puedes añadir 1 solo rol pero el que querramos
    public function crearUsuario(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $nuevoUsuario = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

            $this->insertarRol($nuevoUsuario->id, $request->input('rol'));

            return response()->json(['message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function insertarRol($idUsuario, $idRol)
    {
        try {
            $usuarioExistente = User::find($idUsuario);

            if (!$usuarioExistente) {
                return response()->json(['error' => 'El usuario no existe'], 404);
            }

            $rolExistente = Rol::where('id', $idRol)->exists();

            if (!$rolExistente) {
                return response()->json(['error' => 'El rol no existe'], 404);
            }

            RolAsignado::create([
                'idusuario' => $idUsuario,
                'idrol' => $idRol,
            ]);

            return response()->json(['message' => 'Rol asignado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
