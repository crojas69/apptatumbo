<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SiteSurveyController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    Route::post('site-survey', [SiteSurveyController::class, 'store']);
    Route::get('site-survey', [SiteSurveyController::class, 'index']);

    // Add Admin routes here protected by admin middleware...
});