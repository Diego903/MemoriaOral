<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriaConflicto extends Model
{
    protected $table = "historias_conflicto";

    protected $fillable = [
        'titulo','texto','usuario_id','municipio_id',
    ];
}