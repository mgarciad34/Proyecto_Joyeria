<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rol;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
 /**Óscar */
class RolFactory extends Factory
{
    public $nombres=['Colaborador','Diseñador','Clasificador','Administrador'];
    public $contador=0;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Rol::class;
    public function definition(): array
    {
        $this->contador++;
        return [
            'id'=>$this->contador,
            'nombre' =>array_pop($this->nombres),
        ];
    }
}
