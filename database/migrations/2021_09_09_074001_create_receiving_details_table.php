<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReceivingDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receiving_details', function (Blueprint $table) {
            $table->id();
            $table->string('ref_no', 15)->comment('receiving ref_no');
            $table->string('description', 155);
            $table->integer('location_id');
            $table->string('plot', 50)->nullable();
            $table->float('quantity');
            $table->string('remarks', 155)->nullable();
            $table->integer('created_by')->default(1);
            $table->integer('updated_by')->default(1);
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
        Schema::dropIfExists('receiving_details');
    }
}
