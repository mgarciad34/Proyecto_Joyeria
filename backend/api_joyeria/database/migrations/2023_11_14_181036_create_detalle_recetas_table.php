<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 /**Óscar */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalle_recetas', function (Blueprint $table) {
            $table->unsignedBigInteger('id_joya');
            $table->unsignedBigInteger('id_componente');
            $table->integer('cantidad');
          
            $table->foreign('id_joya')->references('id')->on('joyas')->onDelete('cascade');
            $table->foreign('id_componente')->references('id')->on('tipos_componentes')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_recetas');
    }
};
