<?php

namespace Database\Factories;

use App\Models\Despiece_lote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Despiece_loteFactory extends Factory
{
   public $descripciones=['HP color blanca',' Sony color negro','ASUS TUF amarilla '];
   public $tipos=[1,2,3];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Despiece_lote::class;
    public function definition(): array
    {
        return [
            'descripcion' =>array_pop($this->descripciones),
            'tipo' =>array_pop($this->tipos),
            'cantidad'=>strval(rand(1,5)),
            'id_lote'=>2,
            'id_clasificador'=>2,
        ];
    }
}
