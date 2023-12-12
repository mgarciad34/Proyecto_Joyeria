<?php

namespace Database\Factories;
use App\Models\Tipos_componente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tipos_componente>
 */
 /**Óscar */
class Tipos_componenteFactory extends Factory
{
   public $nombres = ['Teclado', 'RAM', 'Tarjeta Gráfica', 'Monitor', 'Ratón', 'Disco Duro', 'Placa Base', 'Altavoces', 'Impresora'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Tipos_componente::class;
    public function definition(): array
    {

       
        
        return [
            'nombre' =>array_pop($this->nombres),
            'cantidad' => $this->faker->numberBetween(1, 100),
        ];
    }
}
