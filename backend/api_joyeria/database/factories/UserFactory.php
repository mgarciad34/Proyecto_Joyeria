<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
 /**Óscar */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public $nombres=['Colaborador','Diseñador','Clasificador','Administrador'];
    public $contador=0;
    public function definition(): array
    {
        $this->contador++;
        $n=array_pop($this->nombres);
        $lower=strtolower($n);
        return [
            'id'=>$this->contador,
            'name' =>$n,
            'email' => $lower.'@jawas.com',
            'password' => bcrypt($lower),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
