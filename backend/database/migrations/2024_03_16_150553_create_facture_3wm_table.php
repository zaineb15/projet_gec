<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->string('num_fact');
            $table->date('date_fact');
            $table->decimal('montant');
            $table->string('devise');
            $table->string('file');
            $table->json('objet')->nullable(); // Champ objet en tant que tableau JSON
            $table->json('pieces_jointes')->nullable(); // Champ pièces jointes en tant que tableau JSON
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
        Schema::dropIfExists('factures');
    }
}
