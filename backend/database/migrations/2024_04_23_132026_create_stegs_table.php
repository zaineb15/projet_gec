<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stegs', function (Blueprint $table) {
            $table->id();
            $table->string('montant');
            $table->string('devise');
            $table->date('date_facture');
            $table->string('objet');
            $table->string('motifs');
            $table->string('numero_po');
            $table->string('id_fiscale');
            $table->string('direction');
            $table->string('fournisseur');
            $table->string('delai_paiement');
            $table->string('structure_ordinatrice');
            $table->string('numero_facture');
            $table->date('date_reception');
            $table->string('upload_document');
            $table->string('nature_3wm');
            $table->string('validation');
            $table->string('user_id');
            $table->string('valide_fisc');
            $table->string('valide_tres');
            $table->string('valide_compt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stegs');
    }
};
