<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SiteSurveyController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    return redirect()->route('login'); // Redirige a la página de login por defecto
});

// Rutas de autenticación para el login
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

// Rutas protegidas por autenticación (middleware)
Route::middleware('auth')->group(function () {
    // Ruta para el Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

// Cerrar sesión
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
