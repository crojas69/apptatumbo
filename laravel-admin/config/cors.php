<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for configuring CORS (Cross-Origin Resource Sharing) settings.
    | You can configure how the application handles CORS for your requests here.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Define qué rutas usarán CORS

    'allowed_methods' => ['*'],  // Permite todos los métodos (GET, POST, etc.)

    'allowed_origins' => ['*'],  // Permite todos los orígenes (puedes reemplazar '*' por una URL específica como 'http://localhost:8100')

    'allowed_headers' => ['*'],  // Permite todos los encabezados

    'exposed_headers' => false,  // No expone encabezados específicos por ahora

    'max_age' => 0,  // Indica el tiempo máximo en segundos que el navegador puede almacenar la respuesta CORS

    'supports_credentials' => true,  // Permite compartir credenciales como cookies o autorización
];
