<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FotoControlador extends Controller
{
    public function cargarImagen(Request $request,$id){

        $messages = [
            'max' => 'El campo se excede del tamaño máximo'
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

            $path = $file->storeAs('perfiles', $id, 's3'); //De esta manera lo guardamos con el nombre que se sube.
                                                                                      //Si se sube la foto de perfil una opción es que el nombre del archivo sea el id del usuairo.
            $url = Storage::disk('s3')->url($path);
            return response()->json(['path' => $path, 'url'=> $url],200);
        }

        return response()->json(['error' => 'No se recibió ningún archivo.'], 400);

    }
}
