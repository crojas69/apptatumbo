<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSurvey extends Model
{
    protected $fillable = [
     'siteName', 'siteDate', 'team',
  'objetivos', 'observacionesSite', 'lld', 'bomDetalle',
  'mantPreventivo', 'mantCorrectivo', 'soporte', 'formacion',
  'aprobacion', 'firmaSurveyor', 'firmaTestigo',
  'fotoTopografia', 'fotoInfraestructura', 'fotoRF',
  'fotoHeadend', 'fotoHogares', 'user_id'
    ];

    protected $casts = [
        'objetivos' => 'array',
        'lld' => 'array',
        'aprobacion' => 'array',
        'siteDate' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}