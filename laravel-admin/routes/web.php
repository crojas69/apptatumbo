<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteSurveyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return view('welcome');
});

Route::resource('users', UserController::class)->middleware(['auth']);


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/admin/surveys', [SiteSurveyController::class, 'index'])->name('admin.surveys');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin/surveys', [SiteSurveyController::class, 'index'])->name('admin.surveys');

    Route::get('/admin/users', function () {
        $users = User::all();
        return view('admin.users.index', compact('users'));
    })->name('admin.users');

    Route::get('/admin/users/create', fn() => view('admin.users.create'))->name('admin.users.create');
    Route::post('/admin/users', [AuthController::class, 'register'])->name('admin.users.store');
});

require __DIR__.'/auth.php';
