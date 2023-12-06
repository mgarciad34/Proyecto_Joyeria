<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Tipos_componente::factory(9)->create();
        \App\Models\Rol::factory(4)->create();
        \App\Models\User::factory(4)->create();
        \App\Models\RolAsignado::factory(4)->create();
        \App\Models\Lote::factory(3)->create();
        \App\Models\Despiece_lote::factory(3)->create();
        \App\Models\Joya::factory(2)->create();
        \App\Models\Detalle_receta::factory(2)->create();
        \App\Models\HistoricoJoya::factory(2)->create();
    }
}
