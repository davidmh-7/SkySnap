<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TiempoDato;
use Illuminate\Support\Facades\Http;

class TiempoDatoController extends Controller
{
    public function obtenerTiempo(Request $request)
    {
        // Obtener la latitud y longitud del request
        $latitud = $request->input('latitud');
        $longitud = $request->input('longitud');

        // Hacer la solicitud a la API de OpenWeatherMap
        $response = Http::get('https://api.openweathermap.org/data/2.5/onecall?lat=43.337016&lon=-1.788918&exclude=hourly,daily&appid=bd5e378503939ddaee76f12ad7a97608&units=metric', [
            'lat' => $latitud,
            'lon' => $longitud,
            'exclude' => 'hourly,daily',
            'appid' => 'bd5e378503939ddaee76f12ad7a97608',
            'units' => 'metric'
        ]);

       
        if ($response->successful()) {
            $datos = $response->json();
     
            TiempoDato::create([
                'ciudad' => $request->input('ciudad'),
                'latitud' => $latitud,
                'longitud' => $longitud,
                'precipitacion' => $datos['current']['rain'] ?? 0, 
                'viento' => $datos['current']['wind_speed'] ?? 0, 
                'temperatura_real' => $datos['current']['temp'],
                'temperatura_fake' => $datos['current']['feels_like'],
                'descripcion' => $datos['current']['weather'][0]['description'],
                'sensacion_termica' => $datos['current']['feels_like']
            ]);

            return response()->json(['message' => 'Datos del tiempo almacenados correctamente'], 200);
        } else {
            return response()->json(['message' => 'Error al obtener los datos del tiempo'], $response->status());
        }
    }
}
