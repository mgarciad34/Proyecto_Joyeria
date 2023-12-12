<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ColaboratorTest extends TestCase
{
    /**
     * Manuel
     */


     //Test insertar lotes
    public function testCrearLote()
    {
        $login = [
            "email" => "colaborador@jawas.com",
            "password" => "colaborador",
        ];

        $response = $this->json("post", "/api/login", $login);

        $token = $response->json('token');



        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->post("/api/lotes/agregar/lote", [

            "id_empresa" => 1,
            "latitud" => "38",
            "longitud" => "68,7",
            "estado" => "Enviado"
        ]);
             $response->assertJson([
                 "mensaje" => "Lote insertado correctamente",
             ]);
    }


     //Test consultar lotes
     public function testConsultarLotes()
     {
         $adminLogin = [
             "email" => "colaborador@jawas.com",
             "password" => "colaborador",
         ];

         $response = $this->json("post", "/api/login", $adminLogin);
         $token = $response->json('token');

         $response = $this->withHeader('Authorization', 'Bearer ' . $token)->get("/api/lotes/consultar");

         $response->assertStatus(200)
             ->assertJsonStructure([
                 'mensaje' => [
                     '*' => [
                         'id',
                         'id_empresa',
                         'latitud',
                         'longitud',
                         'estado',
                         'id_clasificador',
                     ],
                 ],
             ]);
     }

}
