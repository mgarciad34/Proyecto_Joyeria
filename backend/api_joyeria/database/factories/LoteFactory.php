<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lote;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lote>
 */
class LoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Lote::class;
    public $estados=['entregado','clasificado','cancelado'];
    public function definition(): array
    
    {
        $clasificador=0;
        if(count($this->estados)==2){
            $clasificador=2;
        }
        return [
            'estado' =>array_pop($this->estados),
            'latitud'=>strval(rand(0,10000)),
            'longitud'=>strval(rand(0,10000)),
            'id_empresa'=>1,
            'id_clasificador'=>$clasificador
        ];
    }
}
