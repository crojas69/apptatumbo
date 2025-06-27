<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSurvey extends Model
{
    use HasFactory;

    // Especificar la tabla si no sigue la convención plural en inglés
    protected $table = 'site_surveys';

    // Definir los campos que se pueden asignar de forma masiva
    protected $fillable = [
        'site_name',
        'address',
        'topographic_conditions',
        'topography_photo',
        'infrastructure',
        'infrastructure_photo',
        'rf_noise',
        'rf_snr',
        'rf_survey_photo',
        'cable_last_mile',
        'cable_photo',
        'headend_location',
        'headend_photo',
        'homes_location',
        'homes_photo',
        'signature',
    ];
}
