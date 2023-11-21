<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipos_componente extends Model
{
    use HasFactory;
    protected $table='tipos_componentes';
    protected $fillable = [
        'nombre',
        'cantidad'
    ];
    protected $timestamps=false;
    
}
