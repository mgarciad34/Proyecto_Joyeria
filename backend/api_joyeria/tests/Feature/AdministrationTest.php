<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AdministrationTest extends TestCase
{
    /**
     * Manuel
     */
    //Test Registro de usuarios
    public function testCrearUsuario()
    {
        $datos = [
            "name" => "usuarioprueba",
            "email" => "userprueba@correo.com",
            "password" => "password123"
        ];

        $this->json("post", "/api/usuarios", $datos)
            ->assertStatus(201)
            ->assertJson([
                "message" => "Usuario creado exitosamente",
            ]);

        $usuario = User::where("email",  "=", "userprueba@correo.com")->delete();
    }

    // Test Login
    public function testLogin()
    {
        $datos = [
            "email" => "administrador@jawas.com",
            "password" => "administrador"
        ];

        $this->json("post", "/api/login", $datos)
            ->assertStatus(200)
            ->assertJsonStructure([
                "success",
                "data" => [
                    "nombre",
                    "foto",
                    "token",
                    "id"
                ],
                "message"
            ])
            ->assertJson([
                "success" => true,
                "message" => "User logged-in!"
            ]);
    }

    //Registrar Usuario desde el administrador
    public function testCrearUsuarioAdministrador()
    {
        $login = [
            "email" => "administrador@jawas.com",
            "password" => "administrador",
        ];

        $response = $this->json("post", "/api/login", $login);

        $token = $response->json('token');



        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->post("/api/administrador/crear/usuario", [

            "name" => "usuarioprueban",
            "email" => "userprueba3@correo.com",
            "password" => "password123",
            "rol" => 4,
        ]);
             $response->assertJson([
                 "message" => "Usuario creado exitosamente",
             ]);

             $usuario = User::where("email",  "=", "userprueba3@correo.com")->delete();
    }

    //Test consultar usuarios desde administrador
    public function testConsultarUsuariosAdministrador()
    {
        $adminLogin = [
            "email" => "administrador@jawas.com",
            "password" => "administrador",
        ];

        $response = $this->json("post", "/api/login", $adminLogin);
        $token = $response->json('token');

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->get("/api/administrador/usuarios");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'usuarios' => [
                    '*' => [
                        'id',
                        'name',
                        'email',
                        'foto',
                    ],
                ],
            ]);
    }

}
