<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RolAsignado;
use App\Models\Rol;
use Exception;
use Illuminate\Support\Facades\Validator;

class ControladorRolAsignado extends Controller
{
    /*Manuel */
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

                $rolesAsignados = RolAsignado::where('id_usuario', $idUsuario)->get();

                if ($rolesAsignados->isEmpty()) {
                    return response()->json(['message' => 'El usuario no tiene roles asignados'], 404);
                }
                $roles = [];
                foreach ($rolesAsignados as $rolAsignado) {
                    $rol = RolAsignado::find($rolAsignado->id);
                    $nombre=Rol::find($rol);
                    if ($rol) {
                        $roles[] = [
                            'id_usuario' => $rol->id_usuario,
                            'id_rol' => $rol->id_rol,
                            'nombre'=>$nombre[0]->nombre,
                        ];
                    }
                }

                return response()->json(['roles' => $roles], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
        /**Óscar */
        public function obtenerRolesPeticion($id){
            try{

                $rolesId=RolAsignado::where('id_usuario', $id)->get();
                $roles=Rol::all();
                $json=[];
                for($i=0;$i<count($roles);$i++){
                $x=0;
                $asignado=false;
                while($x<count($rolesId)  && $asignado==false){
                    if($rolesId[$x]->id_rol==$roles[$i]->id){
                        $asignado=true;
                    }else{
                        $x++;
                    }
                }
                if($asignado){
                    $json['asignados'][]=$roles[$i];
                }else{
                    $json['no_asignados'][]=$roles[$i];
                }
                
            }
            return response()->json([$json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'No se puedo obtener los roles'],500);
        }
            
        }
        
    }
