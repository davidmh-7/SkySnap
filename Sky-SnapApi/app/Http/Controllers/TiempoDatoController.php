<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TiempoDato;

class TiempoDatoController extends Controller
{
    
    public function obtenerDatosEnJson()
    {
        $datos = TiempoDato::all();
   
        $datosJson = $datos->toJson();

        return $datosJson;
    }
}
