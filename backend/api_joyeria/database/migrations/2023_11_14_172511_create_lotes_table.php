<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 /** Manuel y Óscar */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lotes', function (Blueprint $table) {
    
            $table->id()->unique();
            $table->unsignedBigInteger('id_empresa');
            $table->string('latitud');
            $table->string('longitud');
            $table->string('estado');
            $table->unsignedBigInteger('id_clasificador')->default(0);
            $table->foreign('id_empresa')->references('id')->on('users')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lotes');
    }
};
