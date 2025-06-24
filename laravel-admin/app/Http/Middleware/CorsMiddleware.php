<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*') // Permitir solicitudes desde cualquier dominio
            ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE') // Métodos permitidos
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization'); // Encabezados permitidos
    }
}
