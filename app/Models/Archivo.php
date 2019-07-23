<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $table = "archivos";
    public $timestamps = false;

    protected $fillable = [
        'nombre', 'nombre_archivo', 'ubicacion', 'metadatos',
    ];
}