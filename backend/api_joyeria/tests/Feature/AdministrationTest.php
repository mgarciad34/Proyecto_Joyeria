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



}
