<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoricoDato;

class HistoricoDatoController extends Controller
{
    public function obtenerDatosHistoricoEnJson()
    {
        $datos = HistoricoDato::all();

        $datosJson = $datos->toJson();

        return $datosJson;
    }
}
