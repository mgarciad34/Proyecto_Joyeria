<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\RolAsignado;
use App\Models\Rol;
class ControladorAuth extends Controller
{
    /**Óscar */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $auth = Auth::user();
            //return $auth;
           $rolesAsignados=RolAsignado::where('id_usuario','=',$auth->id)->get('id_rol');
           $permisos=[];
           $rolesTotales=Rol::all();
           for($i=0;$i<count($rolesAsignados);$i++){
            for($x=0;$x<count($rolesTotales);$x++){
                if($rolesAsignados[$i]->id_rol==$rolesTotales[$x]->id){
                    $permisos[]= $rolesTotales[$x]->nombre;
                }
            }
            }
            $success['nombre']=$auth->name;
            $success['foto']=$auth->foto;
            $success['token'] =  $auth->createToken('access_token',$permisos)->plainTextToken;
            $success['id'] =  $auth->id;

            return response()->json(["success"=>true,"data"=>$success, "message" => "User logged-in!"]);
        }
        else{
            return response()->json("Unauthorised",204);
        }
    }
    public function logout($id)
    {
        $user=User::find($id);
        if($user){
            $user->tokens()->delete();
            return response()->json(["success"=>true, "message" => "Tokens Revoked: "],200);
        }
        else {
            return response()->json("Unauthorised",204);
        }

    }
}
