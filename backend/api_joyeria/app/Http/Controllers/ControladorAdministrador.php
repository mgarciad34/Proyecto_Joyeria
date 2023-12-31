<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RolAsignado;
use App\Models\Rol;
use App\Models\Peticion;
use App\Models\TipoPeticion;
use Illuminate\Support\Facades\Mail;
use Exception;

class ControladorAdministrador extends Controller
{
    /*Manuel
    */
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

    public function modificarUsuario(Request $request, $id)
{
    try {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $usuario = User::findOrFail($id);

        $usuario->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);

        return response()->json(['message' => 'Usuario modificado exitosamente'], 200);
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

        $registroExistente = RolAsignado::where('id_usuario', $idUsuario)
                                        ->where('id_rol', $idRol)
                                        ->exists();

        if ($registroExistente) {
            return response()->json(['message' => 'El rol ya está asignado al usuario'], 400);
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
            'id_usuario' => $idUsuario,
            'id_rol' => $idRol,
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

            $rolAsignado = RolAsignado::where('id_usuario', $idUsuario)
            ->where('id_rol', $idRol)->first();

            if (!$rolAsignado) {
                return response()->json(['error' => 'El rol no está asignado al usuario'], 400);
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
    /**Óscar */
    public function consultarPeticiones(){
        try{


            $peticiones=Peticion::all();
            for($i=0;$i<count($peticiones);$i++){

                $tipos=TipoPeticion::find($peticiones[$i]->solicitud);

                $usuario=User::find($peticiones[$i]->solicitante);
                $peticiones[$i]->solicitante_nombre=$usuario->name;
                $peticiones[$i]->solicitud_nombre=$tipos->nombre;
                if($peticiones[$i]->solicitud==1||$peticiones[$i]->solicitud==2){
                    $rol=Rol::find($peticiones[$i]->solicitado);
                    $peticiones[$i]->solicitado_nombre=$rol->nombre;
                }
            }
            $json['peticiones']=$peticiones;
            return response()->json([$json],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al obtener las peticiones','error'=>$e->getMessage(),400]);
        }
        }
         /**Óscar */
    public function actualizarPeticion($id,Request $request){
        try{

            $peticion=Peticion::find($id);
            $estado=$request->get('estado');
            if($estado=='aceptado'){

                if($peticion->solicitud==1){
                    $asignacion=new RolAsignado();
                    $asignacion->id_rol=$peticion->solicitado;
                    $asignacion->id_usuario=$peticion->solicitante;
                    $asignacion->save();
                }
                if($peticion->solicitud==2){
                    $asignacion=RolAsignado::where('id_usuario','=',$peticion->solicitante)->where('id_rol','=',$peticion->solicitado);
                    $asignacion->delete();
                }

            }
            $peticion->estado=$estado;
            $peticion->save();
            $this->enviarMail($peticion);
            return response()->json(['mensaje'=>'Actualizado correctamente'],200);
        }catch(Exception $e){
            return response()->json(['mensaje'=>'Error al actualizar la peticion',$e->getMessage(),$peticion],500);
        }
    }
/**Óscar */
    function enviarMail($peticion){
        $usuario=User::find($peticion->solicitante);

        $tipo=TipoPeticion::find($peticion->solicitud);
        $rol=Rol::find($peticion->solicitado);

        $datos=[
            'email'=>$usuario->email,
            'tipo'=>$tipo->nombre,
            'solicitado'=>$rol->nombre,
            'estado'=>$peticion->estado,

        ];

        $email=$datos['email'];
        Mail::send('correo',$datos,function($message) use ($email){
            $message->to($email)->subject('Actualizacion peticion');
            $message->from('support@gitignore.tech','Se ha actualizado su solicitud');
        });
        return response()->json(['mensaje'=>'Email enviado correctamente'],200);
    }
}
