<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSurvey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteSurveyController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        // Upload photos and save URLs
        $photoFields = ['fotoTopografia', 'fotoInfraestructura', 'fotoRF', 'fotoHeadend', 'fotoHogares'];
        foreach ($photoFields as $photoField) {
            if ($request->hasFile($photoField)) {
                $file = $request->file($photoField);
                $path = $file->store('public/site-surveys');
                $data[$photoField] = Storage::url($path);
            }
        }

        // Decode JSON arrays sent as strings from Ionic
        foreach (['objetivos', 'lld', 'aprobacion'] as $jsonField) {
            if (isset($data[$jsonField]) && is_string($data[$jsonField])) {
                $data[$jsonField] = json_decode($data[$jsonField], true);
            }
        }

        $survey = SiteSurvey::create($data);

        return response()->json(['message' => 'Site survey saved', 'survey' => $survey], 201);
    }

    public function index()
    {
        $surveys = SiteSurvey::latest()->paginate(15);
        return response()->json($surveys);
    }
}