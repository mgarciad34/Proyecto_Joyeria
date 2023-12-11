<?php

namespace Database\Factories;

use App\Models\Detalle_receta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Detalle_receta>
 */
 /**Óscar */
class Detalle_recetaFactory extends Factory
{
    public $cantidades=[ 200, 1];
    public $numero=[ 2, 1];
    public $model=Detalle_receta::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $n=array_pop($this->numero);
        return [
            'id_joya' =>$n,
            'id_componente' =>$n,
            'cantidad' =>array_pop($this->cantidades),
        ];
    }
}
