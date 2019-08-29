<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GestionTestimonio extends Model
{
    protected $table = "gestion_testimonios";
    public $timestamps = false;

    protected $fillable = [
        'accion', 'fecha', 'observaciones', 'usuario_id','testimonio_id',
    ];
}