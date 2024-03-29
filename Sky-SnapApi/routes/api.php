<?php
  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
  
use App\Http\Controllers\RegisterController;
  
use App\Http\Controllers\TiempoDatoController;
use App\Http\Controllers\HistoricoDatoController;



  
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
  
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
Route::middleware('auth:api')->group( function () {
    Route::get('logout', [RegisterController::class, 'logout']);
});

Route::get('getTiempoDato', [TiempoDatoController::class, 'obtenerDatosEnJson']);
Route::get('getHistoricoDato', [HistoricoDatoController::class, 'obtenerDatosHistoricoEnJson']);
     
Route::middleware('auth:api')->group( function () {
    Route::resource('products', ProductController::class);
});