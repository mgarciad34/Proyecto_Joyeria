<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 /**Óscar */
class Detalle_receta extends Model
{
    use HasFactory;

    protected $primaryKey = ['id_joya', 'id_componente'];
    public $incrementing = false; 
    public $timestamps = false;
   protected $fillable=[
        'cantidad'
   ];

}
