<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSitesSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('site_name');
            $table->string('address');
            $table->text('topographic_conditions')->nullable();
            $table->string('topography_photo')->nullable();
            $table->text('infrastructure')->nullable();
            $table->string('infrastructure_photo')->nullable();
            $table->integer('rf_noise')->nullable();
            $table->integer('rf_snr')->nullable();
            $table->string('rf_survey_photo')->nullable();
            $table->text('cable_last_mile')->nullable();
            $table->string('cable_photo')->nullable();
            $table->string('headend_location')->nullable();
            $table->string('headend_photo')->nullable();
            $table->string('homes_location')->nullable();
            $table->string('homes_photo')->nullable();
            $table->text('signature')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_surveys');
    }
}
