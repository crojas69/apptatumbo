<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteSurvey;
use Illuminate\Support\Facades\Auth;

class SiteSurveyController extends Controller
{
    public function index()
    {
        // Trae solo los registros del usuario autenticado
        $surveys = SiteSurvey::where('user_id', Auth::id())->latest()->get();

        return view('admin.surveys.index', compact('surveys'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'siteName' => 'required',
            'siteDate' => 'required|date',
            'team' => 'required',
        ]);

        SiteSurvey::create($request->all());
        return response()->json(['message' => 'Guardado correctamente'], 201);
    }
}
