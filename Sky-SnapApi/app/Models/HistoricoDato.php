<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricoDato extends Model
{
    use HasFactory;
    
    protected $table = 'historico_datos';

    protected $fillable = [
        'ciudad',
        'latitud',
        'longitud',
        'precipitacion',
        'viento',
        'temperatura_real',
        'descripcion',
        'fecha'
    ];

    public $timestamps = false;
}
