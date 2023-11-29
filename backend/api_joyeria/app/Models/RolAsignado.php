<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolAsignado extends Model
{

    use HasFactory;
    protected $table = 'roles_asignados';
    protected $fillable = [
        'id_usuario',
        'id_rol',
    ];
    public $timestamps = false;

}
