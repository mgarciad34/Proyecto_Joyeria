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
        Schema::create('despiece_lotes', function (Blueprint $table) {
            $table->id();
            $table->text('descripcion');
            $table->unsignedBigInteger('tipo');
            $table->integer('cantidad');
            $table->unsignedBigInteger('id_lote');
           $table->unsignedBigInteger('id_clasificador');

           $table->foreign('id_clasificador')->references('id')->on('users');
           $table->foreign('id_lote')->references('id')->on('lotes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_despiece_lotes');
    }
};
