<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolAsignado extends Model
{
    protected $fillable = [
        'idusuario',
        'idrol',
        // Otros campos si los hay
    ];

}
