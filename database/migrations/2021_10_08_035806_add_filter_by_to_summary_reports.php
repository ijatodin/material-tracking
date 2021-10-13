<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFilterByToSummaryReports extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('summary_reports', function (Blueprint $table) {
            $table->string('filter_by', 20)->nullable()->after('sum_no');
            $table->integer('created_by')->after('status');
            $table->integer('updated_by')->after('created_by');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('summary_reports', function (Blueprint $table) {
            $table->dropColumn('filter_by');
            $table->dropColumn('created_by');
            $table->dropColumn('updated_by');
        });
    }
}
