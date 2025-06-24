<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\BroadcastManager;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\ChannelManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // Define custom route bindings, if necessary
    }

    /**
     * Define the routes for your application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
        $this->mapAuthRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    /**
     * Define the "auth" routes for the application.
     *
     * @return void
     */
    protected function mapAuthRoutes()
    {
        // Rutas para la autenticación y verificación de correo electrónico
        Route::middleware(['web', 'guest'])->group(function () {
            // Aquí se definen las rutas para el inicio de sesión, registro y recuperación de contraseñas
            Route::get('login', [Auth\LoginController::class, 'showLoginForm'])->name('login');
            Route::post('login', [Auth\LoginController::class, 'login']);
            Route::post('logout', [Auth\LoginController::class, 'logout'])->name('logout');

            // Rutas para registro de usuarios
            Route::get('register', [Auth\RegisterController::class, 'showRegistrationForm'])->name('register');
            Route::post('register', [Auth\RegisterController::class, 'register']);

            // Rutas para recuperación de contraseñas
            Route::get('password/reset', [Auth\ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
            Route::post('password/email', [Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
            Route::get('password/reset/{token}', [Auth\ResetPasswordController::class, 'showResetForm'])->name('password.reset');
            Route::post('password/reset', [Auth\ResetPasswordController::class, 'reset']);

            // Ruta de verificación de correo electrónico
            Route::get('email/verify', [Auth\VerificationController::class, 'show'])->name('verification.notice');
            Route::get('email/verify/{id}/{hash}', [Auth\VerificationController::class, 'verify'])->name('verification.verify');
            Route::post('email/verification-notification', [Auth\VerificationController::class, 'send'])->name('verification.send');
        });

        // Rutas protegidas que requieren verificación de correo electrónico
        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/dashboard', function () {
                return view('dashboard');
            })->name('dashboard');
        });
    }
}
