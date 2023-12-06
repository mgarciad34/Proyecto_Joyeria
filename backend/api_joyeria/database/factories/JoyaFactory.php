<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Joya>
 */
class JoyaFactory extends Factory
{
    public $nombres=[' Collar','Pendientes'];
    public  $fotos=['https://jawa-oscar.s3.eu-west-3.amazonaws.com/joyas/2',
    'https://jawa-oscar.s3.eu-west-3.amazonaws.com/joyas/1'];
    public $model=Joya::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' =>array_pop($this->nombres),
            'foto'=>array_pop($this->fotos),
            'id_usuario'=>3,
        ];
    }
}
