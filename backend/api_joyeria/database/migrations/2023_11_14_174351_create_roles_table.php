<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 /**Manuel y Óscar */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
        });

        //Inserción de datos
        // DB::table('roles')->insert([
        //     'nombre' => 'Administrador',
        // ]);
        // DB::table('roles')->insert([
        //     'nombre' => 'Clasificador',
        // ]);
        // DB::table('roles')->insert([
        //     'nombre' => 'Usuario',
        // ]);
        // DB::table('roles')->insert([
        //     'nombre' => 'Colaborador',
        // ]);
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
