<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RolAsignado;

class RolAsignado extends Model
{
    protected $table = 'roles_asignados';
    protected $fillable = [
        'idusuario',
        'idrol',
    ];
    public $timestamps = false;

}
