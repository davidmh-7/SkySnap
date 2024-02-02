<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;


class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
{
    $schedule->call('App\Http\Controllers\TiempoDatoController@traer_datos')->everyFifteenMinutes();
    $schedule->call('App\Http\Controllers\TiempoDatoController@datosFake')->everyTenSeconds();
    
    //Hace le historico de datos 
    $schedule->call('App\Http\Controllers\HistoricoDatoController@guardar_datos')->everyFifteenMinutes();
}


    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
    
        require base_path('routes/console.php');
    }
    
}
