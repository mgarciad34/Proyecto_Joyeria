<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle_receta extends Model
{
    use HasFactory;

    protected $primaryKey = ['id', 'id_componente'];

}
