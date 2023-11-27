<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RolAsignado;
use App\Http\Controllers\ControladorRolAsignado;

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


}
