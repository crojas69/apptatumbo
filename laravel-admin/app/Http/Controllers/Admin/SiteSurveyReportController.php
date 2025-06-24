<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSurvey;

class SiteSurveyReportController extends Controller
{
    public function index()
    {
        $surveys = SiteSurvey::latest()->paginate(15);
        return view('admin.site-surveys.index', compact('surveys'));
    }
}