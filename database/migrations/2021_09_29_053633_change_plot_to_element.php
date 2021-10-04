<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangePlotToElement extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('receiving_details', function (Blueprint $table) {
            $table->renameColumn('plot', 'element');
            $table->dropColumn('location_id');
            $table->integer('material_id')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('receiving_details', function (Blueprint $table) {
            $table->renameColumn('element', 'plot');
            $table->integer('location_id')->nullable();
            $table->dropColumn('material_id');
        });
    }
}
