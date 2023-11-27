<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despiece_lote extends Model
{
    use HasFactory;
    protected $fillable = [
        'descripcion',
        'tipo',
        'cantidad',
    ];
    public $timestamps = false;
}
