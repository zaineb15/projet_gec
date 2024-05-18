<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBordereauTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bordereaus', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable();
            $table->string('nature')->nullable();
            $table->string('status')->nullable();
            $table->string('folder')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->string('sent_by')->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bordereaus');
    }
}
