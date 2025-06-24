<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitsApprovalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visit_approvals', function (Blueprint $table) {
            $table->id();
            $table->string('site_name');
            $table->timestamp('visit_date')->nullable();
            $table->integer('rssi')->nullable();
            $table->string('coverage_photo')->nullable();
            $table->text('connectivity_results')->nullable();
            $table->string('connectivity_photo')->nullable();
            $table->integer('devices_tested')->nullable();
            $table->string('devices_photo')->nullable();
            $table->text('web_access_results')->nullable();
            $table->string('web_access_photo')->nullable();
            $table->text('equipment_functionality')->nullable();
            $table->string('equipment_photo')->nullable();
            $table->text('equipment_list')->nullable();
            $table->string('equipment_list_photo')->nullable();
            $table->enum('conclusion', ['aprobado', 'no_aprobado']);
            $table->text('signature')->nullable();  // Firma del supervisor
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
        Schema::dropIfExists('visit_approvals');
    }
}
