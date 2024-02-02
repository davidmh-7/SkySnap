<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TiempoDato;
use Illuminate\Support\Facades\Http;

class TiempoDatoController extends Controller
{
    public function traer_datos()
    {
        try {
            
            $ciudades = TiempoDato::all();
    
            foreach ($ciudades as $ciudad) {
                
                $apiCall = "https://api.openweathermap.org/data/2.5/onecall?lang=es&lat=" . $ciudad->latitud . "&lon=" . $ciudad->longitud . "&exclude=hourly,daily&appid=bd5e378503939ddaee76f12ad7a97608&units=metric";
                $response = json_decode(@file_get_contents($apiCall), true);
    
                // Verificar si la llamada a la API fue exitosa y si contiene datos de precipitación
                if ($response && isset($response["minutely"]) && isset($response["minutely"][0]["precipitation"])) {
                    $ciudad->update([
                        "precipitacion" => $response["minutely"][0]["precipitation"],
                    ]);
                }
    
                if ($response && isset($response["current"])) {
                    $ciudad->update([
                        "temperatura_real" => $response["current"]["temp"],
                        "descripcion" => $response["current"]["weather"][0]["description"],
                        "sensacion_termica" => $response["current"]["feels_like"],
                        "viento" => $response["current"]["wind_speed"] ?? null,
                    ]);
                } else {
                    \Log::error('No se pudo obtener una respuesta válida de la API para la ciudad: ' . $ciudad->ciudad);
                }
            }
        } catch (\Exception $e) {
            \Log::error('Error al actualizar datos: ' . $e->getMessage());
        }
    }
    

    public function datosFake()
    {
        try {
            // Obtener todos los registros de la tabla tiempo_datos
            $ciudades = TiempoDato::all();
    
            foreach ($ciudades as $ciudad) {
                // Realizar la llamada a la API para obtener los datos actualizados
                $apiCall = "https://api.openweathermap.org/data/2.5/onecall?lang=es&lat=" . $ciudad->latitud . "&lon=" . $ciudad->longitud . "&exclude=hourly,daily&appid=bd5e378503939ddaee76f12ad7a97608&units=metric";
                $response = json_decode(@file_get_contents($apiCall), true);
    
                if ($response && isset($response["current"])) {
                    $temperatura_real = $response["current"]["temp"];
    
                    $temperatura_falsa = $temperatura_real + (rand(-2, 2) / 10);
    
                    if ($temperatura_falsa < ($temperatura_real - 1) || $temperatura_falsa > ($temperatura_real + 1)) {
                        $temperatura_falsa = $temperatura_real;
                    }

                    $ciudad->update([
                        "temperatura_fake" => $temperatura_falsa,
                    ]);
                } else {
                    \Log::error('No funcionan los datos fake');
                }
            }
        } catch (\Exception $e) {
            \Log::error('Error al actualizar datos: ' . $e->getMessage());
        }
    }
    


}