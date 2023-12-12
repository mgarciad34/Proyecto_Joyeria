<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 /**Óscar */
class Peticion extends Model
{
    use HasFactory;
    protected $table = 'peticiones';
    protected $fillable = ['solicitud','solicitado'];
    public $timestamps = false;
}
