<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoricoDato;
use App\Models\TiempoDato;

class HistoricoDatoController extends Controller
{
    public function guardar_datos()
    {
        try {
            $ciudades = TiempoDato::all();

            foreach ($ciudades as $ciudad) {
                
                $apiCall = "https://api.openweathermap.org/data/2.5/onecall?lang=es&lat=" . $ciudad->latitud . "&lon=" . $ciudad->longitud . "&exclude=hourly,daily&appid=bd5e378503939ddaee76f12ad7a97608&units=metric";
                $response = json_decode(@file_get_contents($apiCall), true);


                if ($response && isset($response["minutely"]) && isset($response["minutely"][0]["precipitation"])) {

                    HistoricoDato::create([
                        "ciudad" => $ciudad->ciudad,
                        "latitud" => $ciudad->latitud,
                        "longitud" => $ciudad->longitud,
                        "precipitacion" => $response["minutely"][0]["precipitation"],
                        "viento" => $response["current"]["wind_speed"] ?? null,
                        "temperatura_real" => $response["current"]["temp"],
                        "descripcion" => $response["current"]["weather"][0]["description"],
                        "fecha" => now(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            
        }
    }
}
