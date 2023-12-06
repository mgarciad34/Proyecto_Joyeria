<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('peticiones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solicitante');
            $table->unsignedBigInteger('solicitado');
            $table->string('estado')->default('pendiente');
            $table->foreign('solicitante')->references('id')->on('users');
            $table->foreign('solicitado')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peticions');
    }
};
