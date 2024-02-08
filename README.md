# Sky-SnapAPI

Este proyecto es un recolector de datos implementado en Laravel.

## Instalación

1. Tener el docker abierto
2. Para inicar el proyecto deberemos ir atraves de cmd a la ruta donde esta situada el proyecto y tendremos que poner docker compose up -d.
3. Una vez echo tendremos que o ir al docker y pinchar en el nginx o poner en el navegador 10.10.17.173:8080 o la ip de la persona mas 80:80.

<!------------------------------------------------------1ºLARAVEL RecolectorDatos-------------------------------------------------------------------->

# RecolectorDatos
La funcion principal de este "Laravel" es recolectar e insertar datos a la BBDD de una API externa en este caso De OpenWeatherMap.

# HistoricoDatoController

Este archivo contiene el controlador `HistoricoDatoController` que se encarga de manejar las operaciones relacionadas con los datos históricos.

## Funciones de HistoricoDatoController

- `guardar_datos()`: Esta función se encarga de guardar los datos históricos de las ciudades. Primero, obtiene todas las ciudades de la base de datos. Luego, para cada ciudad, realiza una llamada a la API de OpenWeatherMap para obtener los datos del tiempo. Si la respuesta de la API contiene datos de precipitación, se crea un nuevo registro en la tabla `HistoricoDato` con los datos de la ciudad y los datos del tiempo obtenidos.



# TiempoDatoController

Este archivo contiene el controlador `TiempoDatoController` que se encarga de manejar las operaciones relacionadas con los datos del tiempo.

## Funciones

- `traer_datos()`: Esta función se encarga de obtener los datos del tiempo para todas las ciudades en la base de datos. Para cada ciudad, realiza una llamada a la API de OpenWeatherMap y actualiza los datos de la ciudad en la base de datos con la respuesta de la API.

- `datosFake()`: Esta función se encarga de generar y actualizar datos de temperatura falsos para todas las ciudades en la base de datos. Para cada ciudad, realiza una llamada a la API de OpenWeatherMap para obtener la temperatura actual, genera una temperatura falsa basada en la temperatura actual, y actualiza el dato de la temperatura falsa de la ciudad en la base de datos.

<!----------------------------------------------------2ºLARAVEL Sky-SnapApi--------------------------------------------------------------->

# Rutas API

Este archivo api.php define las rutas API para tu aplicación. En Laravel, las rutas determinan cómo responde la aplicación a las solicitudes HTTP entrantes. Aquí tienes una descripción de las rutas definidas en este archivo:

Route::post('register', [RegisterController::class, 'register']);: Esta ruta maneja las solicitudes POST a la URL /register. Cuando se recibe una solicitud a esta URL, se llama al método register del RegisterController.

Route::post('login', [RegisterController::class, 'login']);: Similar a la ruta anterior, esta ruta maneja las solicitudes POST a la URL /login. Cuando se recibe una solicitud a esta URL, se llama al método login del RegisterController.

Route::middleware('auth:api')->group( function () { Route::get('logout', [RegisterController::class, 'logout']); });: Esta ruta maneja las solicitudes GET a la URL /logout, pero solo si el usuario está autenticado. Si el usuario no está autenticado, se devolverá un error 401 (No autorizado). Si el usuario está autenticado, se llama al método logout del RegisterController.

Route::get('getTiempoDato', [TiempoDatoController::class, 'obtenerDatosEnJson']);: Esta ruta maneja las solicitudes GET a la URL /getTiempoDato. Cuando se recibe una solicitud a esta URL, se llama al método obtenerDatosEnJson del TiempoDatoController.

Route::get('getHistoricoDato', [HistoricoDatoController::class, 'obtenerDatosHistoricoEnJson']);: Esta ruta maneja las solicitudes GET a la URL /getHistoricoDato. Cuando se recibe una solicitud a esta URL, se llama al método obtenerDatosHistoricoEnJson del HistoricoDatoController.

Route::middleware('auth:api')->group( function () { Route::resource('products', ProductController::class); });: Esta ruta define varias rutas para manejar solicitudes relacionadas con recursos de 'products'. Las rutas generadas incluyen rutas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Estas rutas solo están disponibles para usuarios autenticados.


# HistoricoDatoController

Este archivo contiene el controlador `HistoricoDatoController` que se encarga de manejar las operaciones relacionadas con los datos históricos.

## Funciones

- `obtenerDatosHistoricoEnJson()`: Esta función se encarga de obtener todos los datos históricos almacenados en la base de datos y devolverlos en formato JSON. Primero, utiliza el método `all()` del modelo `HistoricoDato` para obtener todos los registros de la tabla `HistoricoDato`. Luego, convierte estos datos a formato JSON utilizando el método `toJson()`. Finalmente, devuelve los datos en formato JSON.


# TiempoDatoController

Este archivo contiene el controlador `TiempoDatoController` que se encarga de manejar las operaciones relacionadas con los datos del tiempo.

## Funciones

- `obtenerDatosEnJson()`: Esta función se encarga de obtener todos los datos del tiempo almacenados en la base de datos y devolverlos en formato JSON. Primero, utiliza el método `all()` del modelo `TiempoDato` para obtener todos los registros de la tabla `TiempoDato`. Luego, convierte estos datos a formato JSON utilizando el método `toJson()`. Finalmente, devuelve los datos en formato JSON.




