<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SiteSurveyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyController;

Route::post('login', [AuthenticatedSessionController::class, 'store']);
Route::post('register', [RegisteredUserController::class, 'store']);

Route::middleware('cors','auth:sanctum')->group(function () {
    Route::post('site-survey', [SiteSurveyController::class, 'store']);
    Route::get('site-survey', [SiteSurveyController::class, 'index']);
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
});

