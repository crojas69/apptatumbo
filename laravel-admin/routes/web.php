<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SiteSurveyController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\VisitApprovalController;
use App\Http\Controllers\ImageController;

Auth::routes(['verify' => true]);

Route::get('/', function () {
    return redirect()->route('login'); // Redirige a la página de login por defecto
});
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/site-survey', [SiteSurveyController::class, 'index'])->name('site-survey.index');
Route::get('/visit-approval', [VisitApprovalController::class, 'index'])->name('visit-approval.index');


// Rutas de autenticación para el login
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

// Rutas protegidas por autenticación (middleware)
Route::middleware('auth')->group(function () {

    // Ruta para las encuestas de administración
    Route::get('/admin/surveys', [SiteSurveyController::class, 'index'])->name('admin.surveys');
    Route::post('/admin/surveys', [SiteSurveyController::class, 'store'])->name('admin.surveys.store');
    
    // Ruta para el perfil del usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rutas de gestión de usuarios
    Route::resource('users', UserController::class)->middleware(['auth']);
});


// Ruta para subir la imagen
Route::post('/upload', [ImageController::class, 'upload']);

// Ruta para guardar la URL de la imagen
Route::post('/save-image-url', [ImageController::class, 'saveImageUrl']);

// Cerrar sesión
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
