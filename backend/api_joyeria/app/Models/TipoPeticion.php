<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 /**Óscar */
class TipoPeticion extends Model
{
    use HasFactory;
    protected $table='tipos_peticiones';
    public $timestamps = false;
}
