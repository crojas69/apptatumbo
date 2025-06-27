<?php

namespace App\Http\Controllers;

use App\Models\SiteSurvey;
use Illuminate\Http\Request;

class SiteSurveyController extends Controller
{
    public function index()
    {
        // Obtener todos los registros de site-surveys
        $siteSurveys = SiteSurvey::all();
        return view('site-survey', compact('siteSurveys'));
    }
}
