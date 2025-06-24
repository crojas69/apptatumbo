<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitApproval extends Model
{
    use HasFactory;

    // Especificar la tabla si no sigue la convención plural en inglés
    protected $table = 'visit_approvals';

    // Definir los campos que se pueden asignar de forma masiva
    protected $fillable = [
        'site_name',
        'visit_date',
        'rssi',
        'coverage_photo',
        'connectivity_results',
        'connectivity_photo',
        'devices_tested',
        'devices_photo',
        'web_access_results',
        'web_access_photo',
        'equipment_functionality',
        'equipment_photo',
        'equipment_list',
        'equipment_list_photo',
        'conclusion',
        'signature',
    ];
}
