<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FotoControlador extends Controller
{
    /**Oscar */
    public function cargarImagen(Request $request,$id){
        $url = $request->url();

        $segmentos = explode('/', $url);
        $objeto = $segmentos[count($segmentos)-3];
        $carpeta='';
        
        if($objeto=='usuarios'){
            $carpeta='perfiles';
        }else{
            $carpeta='joyas';
        }
        
        $messages = [
            'max' => 'La foto se excede del tamaño máximo'
        ];

        $validator = Validator::make($request->all(), [
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], $messages);
        if ($validator->fails()){
            return response()->json($validator->errors(),202);
        }
        
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            // $path = $file->store('perfiles', 's3'); // 'perfiles' es la carpeta en tu bucket. Este método le asigna un UID a la imagen.

            $path = $file->storeAs($carpeta, $id, 's3'); 
                                                                                      
            $url = Storage::disk('s3')->url($path);
            if($carpeta=='perfiles'){
                $user=User::find($id);
                $fotoAntigua=explode('/',$user->foto);
                if($fotoAntigua[count($fotoAntigua)-1]=='default'){
                   $user->foto=$url;
                   $user->save();
                };
                
            }
            return response()->json(['path' => $path, 'url'=> $url],200);
        }

        return response()->json(['error' => 'No se recibió ningún archivo.'], 400);

    }
}
