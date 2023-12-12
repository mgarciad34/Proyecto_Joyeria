<?php

namespace Database\Factories;

use App\Models\HistoricoJoya;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
use Illuminate\Support\Carbon as SupportCarbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
 /**Óscar */
class HistoricoJoyaFactory extends Factory
{
    public $fechas=['2023/12/02', '2023/12/02'];
    public $numero=[ 2, 1];
    public $model=HistoricoJoya::class;
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
            'id_usuario' =>$n,
            'creado' =>array_pop($this->fechas),
        ];
    }
}
