<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('historico_joyas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_joya');
            $table->unsignedBigInteger('id_usuario');
            $table->date('creado');
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->foreign('id_joya')->references('id')->on('joyas');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
