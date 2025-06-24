<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Mostrar la vista de inicio de sesión.
     */
    public function create()
    {
        return view('auth.login'); // Devuelve la vista de login
    }

    /**
     * Manejar la solicitud de autenticación entrante.
     */
    public function store(Request $request)
    {
        // Validar las credenciales
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Si la autenticación es exitosa, redirige a la página de inicio
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard')); // Redirige al dashboard o página de inicio
        }

        // Si las credenciales no son válidas, muestra un error
        return back()->withErrors([
            'email' => 'Las credenciales proporcionadas no son correctas.',
        ]);
    }

    /**
     * Destruir la sesión autenticada (logout).
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        // Invalida y regenera el token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
