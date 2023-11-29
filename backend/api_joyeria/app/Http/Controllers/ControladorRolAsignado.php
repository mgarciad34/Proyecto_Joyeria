<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RolAsignado;
use App\Http\Controllers\ControladorRolAsignado;
use Illuminate\Support\Facades\Validator;

class ControladorRolAsignado extends Controller
{
        public function InsertarRolConValidacion($idUsuario, $idRol)
        {
            try {
                // Validar los datos directamente en el controlador que llama a este método
                $this->validate([
                    'idUsuario' => 'required|numeric',
                    'idRol' => 'required|numeric',
                ]);

                RolAsignado::create([
                    'idusuario' => $idUsuario,
                    'idrol' => $idRol,
                ]);

                return response()->json(['message' => 'Rol asignado exitosamente'], 201);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        public function obtenerRolesId($idUsuario)
        {
            try {
                // Validar el ID del usuario manualmente usando la clase Validator
                $validator = Validator::make(['id' => $idUsuario], [
                    'id' => 'required|numeric',
                ]);

                if ($validator->fails()) {
                    return response()->json(['error' => $validator->errors()], 400);
                }

                $rolesAsignados = RolAsignado::where('idusuario', $idUsuario)->get();

                if ($rolesAsignados->isEmpty()) {
                    return response()->json(['message' => 'El usuario no tiene roles asignados'], 404);
                }
                $roles = [];
                foreach ($rolesAsignados as $rolAsignado) {
                    $rol = RolAsignado::find($rolAsignado->id);
                    if ($rol) {
                        $roles[] = [
                            'idusuario' => $rol->idusuario,
                            'idrol' => $rol->idrol,
                        ];
                    }
                }

                return response()->json(['roles' => $roles], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

}
