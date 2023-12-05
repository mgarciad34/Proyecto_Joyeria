<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RolAsignado;
use Exception;

class ControladorUsuarios extends Controller
{
    // ...

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

            $this->insertarRol($nuevoUsuario->id, '4');

            return response()->json(['message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function insertarRol($idUsuario, $idRol)
    {
        try {


            RolAsignado::create([
                'idusuario' => $idUsuario,
                'idrol' => $idRol,
            ]);

            return response()->json(['message' => 'Rol asignado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
/**Óscar */
    public function updateEmail(Request $request,$id){
        try{
          
            $nuevo=$request->get('email');
            $usuario=User::find($id);
            $usuario->email=$nuevo;
            $usuario->save();
            return response()->json(['mensaje'=>'Actualización de email exitosa'],200);
        }catch(Exception $e){
            return response()->json(['mensaje' =>'Error al actualizar el email'], 409);
        }
    }

/**Óscar */
public function actualizarPassword(Request $request,$id){
    try{
      
        $nuevo=$request->get('password');
        $usuario=User::find($id);
        $usuario->password=bcrypt($nuevo);
        $usuario->save();
        return response()->json(['mensaje'=>'Actualización de contraseña exitosa'],200);
    }catch(Exception $e){
        return response()->json(['mensaje' =>'Error al actualizar la contraseña'], 409);
    }
}


}

