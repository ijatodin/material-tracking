<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameSupplierAndSubconInReceivings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('receivings', function (Blueprint $table) {
            $table->renameColumn('supplier', 'supplier_id');
            $table->renameColumn('subcon', 'subcon_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('receivings', function (Blueprint $table) {
            $table->renameColumn('supplier_id', 'supplier');
            $table->renameColumn('subcon_id', 'subcon');
        });
    }
}
