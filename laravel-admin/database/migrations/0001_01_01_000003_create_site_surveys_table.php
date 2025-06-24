<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiteSurveysTable extends Migration
{
    public function up()
    {
        Schema::create('site_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('siteName');
            $table->date('siteDate');
            $table->string('team');
            $table->json('objetivos')->nullable();
            $table->text('observacionesSite')->nullable();
            $table->json('lld')->nullable();
            $table->text('bomDetalle')->nullable();
            $table->text('mantPreventivo')->nullable();
            $table->text('mantCorrectivo')->nullable();
            $table->text('soporte')->nullable();
            $table->text('formacion')->nullable();
            $table->json('aprobacion')->nullable();
            $table->string('firmaSurveyor')->nullable();
            $table->string('firmaTestigo')->nullable();
            $table->string('fotoTopografia')->nullable();
            $table->string('fotoInfraestructura')->nullable();
            $table->string('fotoRF')->nullable();
            $table->string('fotoHeadend')->nullable();
            $table->string('fotoHogares')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('site_surveys');
    }
}