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
                'rol' => 'required',
            ]);

            $nuevoUsuario = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

            $this->insertarRol($request, $nuevoUsuario->id, $request->input('rol'));

            return response()->json(['message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function consultarUsuarios()
    {
        try {
            $usuarios = User::all();

            return response()->json(['usuarios' => $usuarios], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function insertarRol(Request $request, $idUsuario = null, $idRol = null)
    {
        try {
            if ($idUsuario !== null && $idRol !== null) {
            } else {
                $request->validate([
                    'idUsuario' => 'required',
                    'idRol' => 'required',
                ]);

                $idUsuario = $request->input('idUsuario');
                $idRol = $request->input('idRol');
            }

            $registroExistente = RolAsignado::where('idusuario', $idUsuario)
                                            ->where('idrol', $idRol)
                                            ->exists();

            if ($registroExistente) {
                return response()->json(['message' => 'El rol ya está asignado al usuario'], 200);
            }

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


    public function eliminarRol(Request $request)
    {
        try {
            $request->validate([
                'idUsuario' => 'required',
                'idRol' => 'required',
            ]);

            $idUsuario = $request->input('idUsuario');
            $idRol = $request->input('idRol');

            $usuarioExistente = User::find($idUsuario);

            if (!$usuarioExistente) {
                return response()->json(['error' => 'El usuario no existe'], 404);
            }


            $rolExistente = Rol::where('id', $idRol)->exists();

            if (!$rolExistente) {
                return response()->json(['error' => 'El rol no existe'], 404);
            }

            $rolAsignado = RolAsignado::where('idusuario', $idUsuario)
            ->where('idrol', $idRol)->first();

            if (!$rolAsignado) {
                return response()->json(['error' => 'El rol no está asignado al usuario'], 404);
            }

            $rolAsignado->delete();

            return response()->json(['message' => 'Rol eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminarUsuarioId($id)
    {
        try {
            $usuario = User::find($id);
            
            if (!$usuario) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }
            $usuario->delete();

            return response()->json(['message' => 'Usuario eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
