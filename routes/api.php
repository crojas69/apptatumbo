<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SiteSurveyController;
use App\Http\Controllers\Api\VisitApprovalController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Rutas protegidas aquí
    Route::post('/site-surveys', [SiteSurveyController::class, 'store']);
    Route::post('/visit-approvals', [VisitApprovalController::class, 'store']);

});