<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Http\Controllers\ControladorJoya;
use App\Models\Detalle_receta;
use App\Models\Joya;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DesignerTest extends TestCase
{


    public function testNuevaJoyaExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/joyas/nueva', [
            'nombre' => 'Joya de Prueba',
            'id_usuario' => 3,
            'detalle' => [
                ['tipo' => 1, 'cantidad' => 10],
                ['tipo' => 2, 'cantidad' => 5],
            ],
        ]);
        $response->assertStatus(201);
        $joyaId = $response->json('id');
        $joya = Joya::find($joyaId);
        $detalle = Detalle_receta::where('id_joya', '=', $joya->id)->delete();
        $joya->delete();
    }
    public function testNuevaJoyaSinAcceso()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Clasificador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/joyas/nueva', [
            'nombre' => 'Joya de Prueba',
            'id_usuario' => 3,
            'detalle' => [
                ['tipo' => 1, 'cantidad' => 10],
                ['tipo' => 2, 'cantidad' => 5],
            ],
        ]);
        $response->assertStatus(202);
        $response->assertJson(["success" => false, "message" => "No autorizado"]);
    }

    public function testFabricarJoyaExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/joyas/fabricar/1', [
            'id_usuario' => 3,
        ]);


        $response->assertStatus(200);

        $response->assertJson([
            'mensaje' => 'Fabricado correctamente',
        ]);
    }

    public function testFabricarJoyaInexistente()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/joyas/fabricar/1000', [
            'id_usuario' => 3,
        ]);


        $response->assertStatus(404);

        $response->assertJson([
            'mensaje' => 'Error al fabricar la joya',
        ]);
    }
    public function testGetAllJoyasExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            [
                '*' => [
                    'id',
                    'nombre',
                    'foto',
                    'id_usuario',
                ],
            ]
        ]);
    }
    public function testGetAllJoyasSinLogin()
    {
        /**Este test es correcto ya que aunque la ruta nologin devuelve el codigo 203
         * al deberse de una redireccion desde el middleware se detecta como 
         * el codigo:  302 (Found o Redirect)
         */
        $response = $this->get('/api/joyas');
        $response->assertStatus(302);
    }

    public function testGetJoyaOfUsuarioExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/usuario/3');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            [
                '*' => [
                    'id',
                    'nombre',
                    'foto',
                    'id_usuario',
                ],
            ]
        ]);
    }
    public function testGetJoyaOfUsuarioSinJoyas()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/usuario/3');
        $response->assertStatus(200);
        $response->assertJsonStructure([]);
    }

    public function testGetAllHistorialExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/historial');
        $response->assertStatus(200);
    }
    public function testGetAllHistorialSinLogin()
    {
        $response = $this->get('/api/joyas/historial');
        $response->assertStatus(302);
    }

    public function testObtenerJoyaByIdExito()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/1');
        $response->assertStatus(200);
        $response->assertJson([
            'id' => 1,
        ]);
    }
    public function testObtenerJoyaByIdSinExistir()
    {
        $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/1000');
        $response->assertStatus(404);
        $response->assertJson([
            'mensaje' => 'Error al obtener la joya',
        ]);
    }

    public function testUpdateJoyaExito()
{
    $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->put('/api/joyas/1', [
        'joya_original' => [
            'nombre' => 'Pendientes',
            'detalle' => [['id_componente' => 1, 'cantidad' => 1]],
        ],
        'joya' => [
            'nombre' => 'Nuevo Nombre',
            'detalle' => [['id_componente' => 2, 'cantidad' => 10]],
        ],
    ]);
    $response->assertStatus(200);
    $response->assertJson([
        'mensaje' => 'Actualizado correctamente',
    ]);
}
public function testUpdateJoyaSinDetalle()
{
    $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->put('/api/joyas/1', [
        'joya_original' => [
            'nombre' => 'Pendientes',
            'detalle' => [['id_componente' => 1, 'cantidad' => 1]],
        ],
        'joya' => [
            'nombre' => 'Nuevo Nombre'
        ],
    ]);


    $response->assertStatus(400);

    $response->assertJson([
        "mensaje"=> "Error en la validación",
        "errores"=> [

            "joya.detalle"=> [
                "El campo joya.detalle es obligatorio."
                ]
                ]
        
    ]);
}
public function testGetOwnerExito()
{
    $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/joyas/owner/1/3');


    $response->assertStatus(200);

    $response->assertJson(['resultado'=>true]);
}
public function testGetOwnerError()
{
    $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/joyas/owner/1/1');
    $response->assertStatus(200);

    $response->assertJson(['resultado'=>false]);
}
public function testGetJoyasDisponibles()
{
    $usuario = User::find(3);
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/joyas/disponibles/lista');
    $response->assertStatus(200);

    $response->assertJsonStructure([
        '*' => [ 
            [
                'id',
                'nombre',
                'foto',
                'id_usuario',
                'creador',
                'fabricaciones',
            ]
        ]
    ]);
}

}
