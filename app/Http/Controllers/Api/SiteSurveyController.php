<?php

namespace App\Http\Controllers\Api;

use App\Models\SiteSurvey;
use Illuminate\Http\Request;

class SiteSurveyController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'site_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'topographic_conditions' => 'nullable|string',
            'topography_photo' => 'nullable|string|max:255',
            'infrastructure' => 'nullable|string',
            'infrastructure_photo' => 'nullable|string|max:255',
            'rf_noise' => 'nullable|integer',
            'rf_snr' => 'nullable|integer',
            'rf_survey_photo' => 'nullable|string|max:255',
            'cable_last_mile' => 'nullable|string',
            'cable_photo' => 'nullable|string|max:255',
            'headend_location' => 'nullable|string|max:255',
            'headend_photo' => 'nullable|string|max:255',
            'homes_location' => 'nullable|string|max:255',
            'homes_photo' => 'nullable|string|max:255',
            'signature' => 'nullable|string',
        ]);

        SiteSurvey::create($data);

        return response()->json(['success' => true]);
    }
}
