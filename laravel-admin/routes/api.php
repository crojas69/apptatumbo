<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SiteSurveyController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// Ruta para el login (POST)
Route::post('login', [AuthController::class, 'login']);

// Ruta para el registro (POST)
Route::post('register', [RegisteredUserController::class, 'store']);  // Asegúrate de que este controlador esté correctamente importado

// Ruta protegida por Sanctum (requiere token)
Route::middleware('auth:sanctum')->group(function () {
    // API para las encuestas (POST y GET)
    Route::post('site-survey', [SiteSurveyController::class, 'store']);
    Route::get('site-survey', [SiteSurveyController::class, 'index']);

    // Ruta para la aprobación de visitas (POST y GET)
    Route::post('visit-approval', [VisitApprovalController::class, 'store']);
    Route::get('visit-approval', [VisitApprovalController::class, 'index']);

    // Ruta para logout (invalidación del token)
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
});
