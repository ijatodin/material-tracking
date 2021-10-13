<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMakerCheckerApproverToSummary extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('summary_reports', function (Blueprint $table) {
            $table->integer('maker_id')->nullable()->after('filter_by');
            $table->integer('checker_id')->nullable()->after('maker_id');
            $table->integer('approver_id')->nullable()->after('checker_id');
            $table->timestamp('checked_at')->nullable()->after('checker_id');
            $table->timestamp('approved_at')->nullable()->after('approver_id');
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
            $table->dropColumn('maker_id');
            $table->dropColumn('checker_id');
            $table->dropColumn('approver_id');
            $table->dropColumn('checked_at');
            $table->dropColumn('approved_at');
        });
    }
}
