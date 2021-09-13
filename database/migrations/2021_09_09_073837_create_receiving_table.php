<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReceivingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receivings', function (Blueprint $table) {
            $table->id();
            $table->string('ref_no', 15);
            $table->string('supplier', 155);
            $table->string('subcon', 155);
            $table->dateTime('date');
            $table->dateTime('received_date');
            $table->integer('location_id');
            $table->string('do_no', 15);
            $table->string('po_no', 15)->nullable();
            $table->text('remarks')->nullable();
            $table->tinyInteger('status')->default(1)->comment('1 - new, 2 - inspecting, 9-completed');
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
        Schema::dropIfExists('receivings');
    }
}
