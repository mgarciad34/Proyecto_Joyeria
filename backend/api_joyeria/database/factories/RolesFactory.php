<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rol;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RolesFactory extends Factory
{
    public $nombres=['Colaborador','Diseñador','Administrador'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Rol::class;
    public function definition(): array
    {
        return [
            
            'nombre' =>array_pop($this->nombres),
                
            
        ];
    }
}
