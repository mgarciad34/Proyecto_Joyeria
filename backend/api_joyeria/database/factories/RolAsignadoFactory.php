<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\RolAsignado;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RolAsignado>
 */
 /**Óscar */
class RolAsignadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public $contador=0;
    protected $model=RolAsignado::class;
    public function definition(): array
    {
        $this->contador++;
        return [
            'id_usuario'=>$this->contador,
            'id_rol'=>$this->contador,
        ];
    }
}
