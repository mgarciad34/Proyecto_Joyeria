<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 /**Óscar */
class Tipos_componente extends Model
{
    use HasFactory;
    protected $table='tipos_componentes';
    protected $fillable = [
        'nombre',
        'cantidad'
    ];
    public $timestamps=false;

}
