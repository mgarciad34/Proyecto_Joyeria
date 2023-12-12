<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Http\Controllers\ControladorJoya;
use App\Models\Detalle_receta;
use App\Models\Joya;
use App\Models\RolAsignado;
use App\Models\Tipos_componente;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
 
class DesignerTest extends TestCase
{

 /**Óscar */
    public function testNuevaJoyaExito()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();
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
        $usuario->delete();
        $rolesAsignados->delete();
    }
     /**Óscar */
    public function testNuevaJoyaSinAcceso()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=2;
        $rolesAsignados->save();
    
        $token = $usuario->createToken('access_token', ['Clasificador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/joyas/nueva', [
            'nombre' => 'Joya de Prueba',
            'id_usuario' => $usuario->id,
            'detalle' => [
                ['tipo' => 1, 'cantidad' => 10],
                ['tipo' => 2, 'cantidad' => 5],
            ],
        ]);
        $response->assertStatus(202);
        $response->assertJson(["success" => false, "message" => "No autorizado"]);
        $usuario->delete();
        $rolesAsignados->delete();
    }
 /**Óscar */
    public function testFabricarJoyaExito()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();

        $tipo=new Tipos_componente();
        $tipo->nombre='TestTipo';
        $tipo->cantidad=1000;
        $tipo->save();

        $joya=new Joya();
        $joya->nombre='Joya Test';
        $joya->foto='testfoto';
        $joya->id_usuario=$usuario->id;
        $joya->save();
        
        $detalle=new Detalle_receta();
        $detalle->id_componente=$tipo->id;
        $detalle->id_joya=$joya->id;
        $detalle->cantidad=1;

        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();
    
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->put('/api/joyas/fabricar/'.$joya->id, [
            'id_usuario' => $usuario->id,
        ]);


        $response->assertStatus(200);

        $response->assertJson([
            'mensaje' => 'Fabricado correctamente',
        ]);
        $usuario->delete();
        $rolesAsignados->delete();
        $detalle->delete();
        $tipo->delete();
        $joya->delete();
    }
 /**Óscar */
    public function testFabricarJoyaInexistente()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();
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
        $usuario->delete();
        $rolesAsignados->delete();

    }
     /**Óscar */
    public function testGetAllJoyasExito()
    {  $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

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
        $usuario->delete();
        $rolesAsignados->delete();
    }
     /**Óscar */
    public function testGetAllJoyasSinLogin()
    {
        /**Este test es correcto ya que aunque la ruta nologin devuelve el codigo 203
         * al deberse de una redireccion desde el middleware se detecta como 
         * el codigo:  302 (Found o Redirect)
         */
        $response = $this->get('/api/joyas');
        $response->assertStatus(302);
    }
 /**Óscar */
    public function testGetJoyaOfUsuarioExito()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

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
        $usuario->delete();
        $rolesAsignados->delete();
    }
     /**Óscar */
    public function testGetJoyaOfUsuarioSinJoyas()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/usuario/'.$usuario->id);
        $response->assertStatus(200);
        $response->assertJsonStructure([]);
        $usuario->delete();
        $rolesAsignados->delete();
    }
 /**Óscar */
    public function testGetAllHistorialExito()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/historial');
        $response->assertStatus(200);

        $usuario->delete();
        $rolesAsignados->delete();
   
    }
     /**Óscar */
    public function testGetAllHistorialSinLogin()
    {
        $response = $this->get('/api/joyas/historial');
        $response->assertStatus(302);
    }
 /**Óscar */
    public function testObtenerJoyaByIdExito()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

        $joya=new Joya();
        $joya->nombre='Joya Test';
        $joya->foto='testfoto';
        $joya->id_usuario=$usuario->id;
        $joya->save();
        $detalle=new Detalle_receta();
        $detalle->id_componente=1;
        $detalle->id_joya=$joya->id;
        $detalle->cantidad=1;

        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/'.$joya->id);
        $response->assertStatus(200);
        $response->assertJson([
            'id' => $joya->id,
        ]);

        $usuario->delete();
        $rolesAsignados->delete();
        $joya->delete();
        $detalle->delete();

    }
     /**Óscar */
    public function testObtenerJoyaByIdSinExistir()
    {
        $usuario = new User;
        $usuario->name='Test';
        $usuario->email='test@test.com';
        $usuario->password='123456';
        $usuario->save();
        $rolesAsignados=new RolAsignado();
        $rolesAsignados->id_usuario=$usuario->id;
        $rolesAsignados->id_rol=3;
        $rolesAsignados->save();

      
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/joyas/1000');
        $response->assertStatus(404);
        $response->assertJson([
            'mensaje' => 'Error al obtener la joya',
        ]);
        $usuario->delete();
        $rolesAsignados->delete();
    }
 /**Óscar */
    public function testUpdateJoyaExito()
{
    $usuario = new User;
    $usuario->name='Test';
    $usuario->email='test@test.com';
    $usuario->password='123456';
    $usuario->save();
    $rolesAsignados=new RolAsignado();
    $rolesAsignados->id_usuario=$usuario->id;
    $rolesAsignados->id_rol=3;
    $rolesAsignados->save();

    $joya=new Joya();
    $joya->nombre='Joya Test';
    $joya->foto='testfoto';
    $joya->id_usuario=$usuario->id;
    $joya->save();
    $detalle=new Detalle_receta();
    $detalle->id_componente=1;
    $detalle->id_joya=$joya->id;
    $detalle->cantidad=1;

        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->put('/api/joyas/1', [
        'joya_original' => [
            'nombre' => $joya->nombre,
            'detalle' => [['id_componente' => $joya->id_componente, 'cantidad' => $joya->cantidad]],
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

    $usuario->delete();
    $rolesAsignados->delete();
    $joya->delete();
    $detalle->delete();
}
 /**Óscar */
public function testUpdateJoyaSinDetalle()
{
    $usuario = new User;
    $usuario->name='Test';
    $usuario->email='test@test.com';
    $usuario->password='123456';
    $usuario->save();
    $rolesAsignados=new RolAsignado();
    $rolesAsignados->id_usuario=$usuario->id;
    $rolesAsignados->id_rol=3;
    $rolesAsignados->save();
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
    $usuario->delete();
    $rolesAsignados->delete();
}
 /**Óscar */
public function testGetOwnerExito()
{
    $usuario = new User;
    $usuario->name='Test';
    $usuario->email='test@test.com';
    $usuario->password='123456';
    $usuario->save();
    $rolesAsignados=new RolAsignado();
    $rolesAsignados->id_usuario=$usuario->id;
    $rolesAsignados->id_rol=3;
    $rolesAsignados->save();

    $joya=new Joya();
    $joya->nombre='Joya Test';
    $joya->foto='testfoto';
    $joya->id_usuario=$usuario->id;
    $joya->save();
    $detalle=new Detalle_receta();
    $detalle->id_componente=1;
    $detalle->id_joya=$joya->id;
    $detalle->cantidad=1;
    
        $token = $usuario->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/joyas/owner/'.$joya->id.'/'.$usuario->id);


    $response->assertStatus(200);

    $response->assertJson(['resultado'=>true]);

    $usuario->delete();
    $rolesAsignados->delete();
    $joya->delete();
    $detalle->delete();
    
}
 /**Óscar */
public function testGetOwnerError()
{   
    $usuario = new User;
    $usuario->name='Test';
    $usuario->email='test@test.com';
    $usuario->password='123456';
    $usuario->save();
    $rolesAsignados=new RolAsignado();
    $rolesAsignados->id_usuario=$usuario->id;
    $rolesAsignados->id_rol=3;
    $rolesAsignados->save();

    $joya=new Joya();
    $joya->nombre='Joya Test';
    $joya->foto='testfoto';
    $joya->id_usuario=$usuario->id;
    $joya->save();
    $detalle=new Detalle_receta();
    $detalle->id_componente=1;
    $detalle->id_joya=$joya->id;
    $detalle->cantidad=1;

    $usuario2 = new User;
    $usuario2->name='Test2';
    $usuario2->email='test2@test.com';
    $usuario2->password='123456';
    $usuario2->save();
    
        $token = $usuario2->createToken('access_token', ['Diseñador'])->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/joyas/owner/'.$joya->id.'/'.$usuario2->id);
    $response->assertStatus(200);

    $response->assertJson(['resultado'=>false]);

    $usuario->delete();
    $usuario2->delete();
    $rolesAsignados->delete();
    $joya->delete();
    $detalle->delete();
}
 /**Óscar */
public function testGetJoyasDisponibles()
{
    $usuario = new User;
    $usuario->name='Test';
    $usuario->email='test@test.com';
    $usuario->password='123456';
    $usuario->save();
    $rolesAsignados=new RolAsignado();
    $rolesAsignados->id_usuario=$usuario->id;
    $rolesAsignados->id_rol=3;
    $rolesAsignados->save();

    $tipo=new Tipos_componente();
    $tipo->nombre='TestTipo';
    $tipo->cantidad=1000;
    $tipo->save();

    $joya=new Joya();
    $joya->nombre='Joya Test';
    $joya->foto='testfoto';
    $joya->id_usuario=$usuario->id;
    $joya->save();
    $detalle=new Detalle_receta();
    $detalle->id_componente=$tipo->id;
    $detalle->id_joya=$joya->id;
    $detalle->cantidad=1;

   
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
    $usuario->delete();
    $rolesAsignados->delete();
    $tipo->delete();
    $joya->delete();
    $detalle->delete();
}

}
