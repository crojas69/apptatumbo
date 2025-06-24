<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteSurvey;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $surveys = SiteSurvey::with('user')->latest()->get();
        $users = User::latest()->get();

        return view('dashboard', compact('surveys', 'users'));
    }
}
