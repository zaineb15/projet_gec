<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
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
            $table->unsignedBigInteger('bordereau')->nullable();
            $table->unsignedBigInteger('fournisseur')->nullable();
            $table->string('dossier')->nullable();
            $table->string('structure')->nullable();
            $table->string('direction')->nullable();
            $table->date('date_fact')->nullable();
            $table->string('period_conso')->nullable();
            $table->string('num_fact')->nullable();
            $table->string('devise');
            $table->decimal('montant', 13, 3)->nullable();
            $table->string('objet')->nullable();
            $table->string('num_po')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->string('factname')->nullable();
            $table->string('pathpdf')->nullable();
            $table->date('datereception')->nullable();
            $table->string('created_by')->nullable();
            $table->string('file');
            $table->string('motifs');
            $table->string('user_id');
            $table->string('validation');
            $table->json('pieces_jointes')->nullable(); // Champ pièces jointes en tant que tableau JSON
            $table->string('valide_fisc');
            $table->string('valide_tres');
            $table->string('valide_compt');
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
};
