<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiempoDato extends Model
{
    use HasFactory;

    protected $table = 'tiempo_datos';

    protected $fillable = [
        'ciudad',
        'latitud',
        'longitud',
        'precipitacion',
        'viento',
        'temperatura_real',
        'temperatura_fake',
        'descripcion',
        'sensacion_termica'
    ];

    public $timestamps = false;
}
