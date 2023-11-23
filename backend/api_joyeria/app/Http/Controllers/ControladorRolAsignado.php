<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ControladorRolAsignado extends Controller
{
    public function InsertarRol($idUsuario, $idRol)
    {
        try {
            $rolAsignado = new RolAsignado();
            $rolAsignado->idusuario = $idUsuario;
            $rolAsignado->idrol = $idRol;
            $rolAsignado->save();

            return response()->json(['message' => 'Rol asignado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
