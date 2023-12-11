<?php

namespace Database\Factories;

use App\Models\TipoPeticion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoPeticion>
 */
class TipoPeticionFactory extends Factory
{
    public $model=TipoPeticion::class;
    public $nombre=['Baja Rol','Alta Rol'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' =>array_pop($this->nombre),
        ];
    }
}
